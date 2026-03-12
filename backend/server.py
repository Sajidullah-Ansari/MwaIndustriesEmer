from fastapi import FastAPI, APIRouter, UploadFile, File, Form, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import base64

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
db_name = os.environ.get('DB_NAME', 'mwa_industries')
client = AsyncIOMotorClient(mongo_url)
db = client[db_name]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Contact Form Model
class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    company_name: Optional[str] = None
    email: EmailStr
    phone: str
    requirement_type: str
    message: str
    file_name: Optional[str] = None
    file_data: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = "new"

# RFQ Form Model
class RFQSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    company_name: str
    email: EmailStr
    phone: str
    product_service: str
    material_type: str
    quantity: str
    delivery_location: str
    timeline: str
    notes: Optional[str] = None
    file_name: Optional[str] = None
    file_data: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = "new"

# Response models
class ContactResponse(BaseModel):
    id: str
    name: str
    company_name: Optional[str]
    email: str
    phone: str
    requirement_type: str
    message: str
    file_name: Optional[str]
    created_at: str
    status: str

class RFQResponse(BaseModel):
    id: str
    name: str
    company_name: str
    email: str
    phone: str
    product_service: str
    material_type: str
    quantity: str
    delivery_location: str
    timeline: str
    notes: Optional[str]
    file_name: Optional[str]
    created_at: str
    status: str

# Routes
@api_router.get("/")
async def root():
    return {"message": "MWA Industries API"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks

# Contact Form Endpoint
@api_router.post("/contact")
async def submit_contact(
    name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    requirement_type: str = Form(...),
    message: str = Form(...),
    company_name: Optional[str] = Form(None),
    file: Optional[UploadFile] = File(None)
):
    file_name = None
    file_data = None
    
    if file and file.filename:
        file_content = await file.read()
        file_data = base64.b64encode(file_content).decode('utf-8')
        file_name = file.filename
    
    submission = ContactSubmission(
        name=name,
        company_name=company_name,
        email=email,
        phone=phone,
        requirement_type=requirement_type,
        message=message,
        file_name=file_name,
        file_data=file_data
    )
    
    doc = submission.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.contact_submissions.insert_one(doc)
    
    return {"success": True, "message": "Thank you for your inquiry. We will contact you within 24 hours.", "id": submission.id}

# RFQ Form Endpoint
@api_router.post("/rfq")
async def submit_rfq(
    name: str = Form(...),
    company_name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    product_service: str = Form(...),
    material_type: str = Form(...),
    quantity: str = Form(...),
    delivery_location: str = Form(...),
    timeline: str = Form(...),
    notes: Optional[str] = Form(None),
    file: Optional[UploadFile] = File(None)
):
    file_name = None
    file_data = None
    
    if file and file.filename:
        file_content = await file.read()
        file_data = base64.b64encode(file_content).decode('utf-8')
        file_name = file.filename
    
    submission = RFQSubmission(
        name=name,
        company_name=company_name,
        email=email,
        phone=phone,
        product_service=product_service,
        material_type=material_type,
        quantity=quantity,
        delivery_location=delivery_location,
        timeline=timeline,
        notes=notes,
        file_name=file_name,
        file_data=file_data
    )
    
    doc = submission.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.rfq_submissions.insert_one(doc)
    
    return {"success": True, "message": "Your quote request has been submitted. Our team will respond within 24 hours.", "id": submission.id}

# Admin Endpoints
@api_router.get("/admin/contacts", response_model=List[ContactResponse])
async def get_contacts():
    contacts = await db.contact_submissions.find({}, {"_id": 0, "file_data": 0}).sort("created_at", -1).to_list(100)
    return contacts

@api_router.get("/admin/rfqs", response_model=List[RFQResponse])
async def get_rfqs():
    rfqs = await db.rfq_submissions.find({}, {"_id": 0, "file_data": 0}).sort("created_at", -1).to_list(100)
    return rfqs

@api_router.patch("/admin/contacts/{contact_id}/status")
async def update_contact_status(contact_id: str, status: str):
    result = await db.contact_submissions.update_one(
        {"id": contact_id},
        {"$set": {"status": status}}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Contact not found")
    return {"success": True}

@api_router.patch("/admin/rfqs/{rfq_id}/status")
async def update_rfq_status(rfq_id: str, status: str):
    result = await db.rfq_submissions.update_one(
        {"id": rfq_id},
        {"$set": {"status": status}}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="RFQ not found")
    return {"success": True}

# Download attachment
@api_router.get("/admin/contacts/{contact_id}/file")
async def download_contact_file(contact_id: str):
    contact = await db.contact_submissions.find_one({"id": contact_id}, {"_id": 0})
    if not contact or not contact.get("file_data"):
        raise HTTPException(status_code=404, detail="File not found")
    return {"file_name": contact["file_name"], "file_data": contact["file_data"]}

@api_router.get("/admin/rfqs/{rfq_id}/file")
async def download_rfq_file(rfq_id: str):
    rfq = await db.rfq_submissions.find_one({"id": rfq_id}, {"_id": 0})
    if not rfq or not rfq.get("file_data"):
        raise HTTPException(status_code=404, detail="File not found")
    return {"file_name": rfq["file_name"], "file_data": rfq["file_data"]}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
