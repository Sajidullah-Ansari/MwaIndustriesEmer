"""
Backend API Tests for MWA Industries Website
Tests all API endpoints: root, contact form, RFQ form, admin endpoints
"""
import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')
if not BASE_URL:
    BASE_URL = "https://fab-engineering-dev.preview.emergentagent.com"


class TestHealthAndRoot:
    """Test API root and health endpoints"""
    
    def test_api_root_returns_200(self):
        """Verify API root endpoint returns 200 and correct message"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        assert data["message"] == "MWA Industries API"
        print(f"✓ API root endpoint working: {data}")


class TestContactForm:
    """Test contact form submission and retrieval"""
    
    def test_contact_form_submission_success(self):
        """Test submitting a contact form with all required fields"""
        test_id = str(uuid.uuid4())[:8]
        form_data = {
            "name": f"TEST_Contact_{test_id}",
            "email": f"test_{test_id}@example.com",
            "phone": "9876543210",
            "requirement_type": "General Enquiry",
            "message": "Test message for API testing",
            "company_name": "Test Company"
        }
        
        response = requests.post(f"{BASE_URL}/api/contact", data=form_data)
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert data["success"] == True
        assert "id" in data
        assert "message" in data
        print(f"✓ Contact form submission successful: {data['id']}")
        return data["id"]
    
    def test_contact_form_validation_missing_email(self):
        """Test contact form validation with missing required field"""
        form_data = {
            "name": "Test User",
            "phone": "9876543210",
            "requirement_type": "General Enquiry",
            "message": "Test message"
            # Missing email
        }
        
        response = requests.post(f"{BASE_URL}/api/contact", data=form_data)
        assert response.status_code == 422, f"Expected 422 for validation error, got {response.status_code}"
        print("✓ Contact form validation working - missing email returns 422")
    
    def test_contact_form_validation_missing_name(self):
        """Test contact form validation with missing name"""
        form_data = {
            "email": "test@example.com",
            "phone": "9876543210",
            "requirement_type": "General Enquiry",
            "message": "Test message"
            # Missing name
        }
        
        response = requests.post(f"{BASE_URL}/api/contact", data=form_data)
        assert response.status_code == 422, f"Expected 422 for validation error, got {response.status_code}"
        print("✓ Contact form validation working - missing name returns 422")


class TestRFQForm:
    """Test RFQ (Request for Quote) form submission and retrieval"""
    
    def test_rfq_form_submission_success(self):
        """Test submitting an RFQ form with all required fields"""
        test_id = str(uuid.uuid4())[:8]
        form_data = {
            "name": f"TEST_RFQ_{test_id}",
            "company_name": f"Test Company {test_id}",
            "email": f"rfq_{test_id}@example.com",
            "phone": "9876543210",
            "product_service": "Heavy Structures",
            "material_type": "Carbon Steel (CS)",
            "quantity": "5 units",
            "delivery_location": "Raipur, Chhattisgarh",
            "timeline": "Standard (2-4 weeks)",
            "notes": "Test RFQ submission for API testing"
        }
        
        response = requests.post(f"{BASE_URL}/api/rfq", data=form_data)
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert data["success"] == True
        assert "id" in data
        assert "message" in data
        print(f"✓ RFQ form submission successful: {data['id']}")
        return data["id"]
    
    def test_rfq_form_validation_missing_company(self):
        """Test RFQ form validation with missing required company_name"""
        form_data = {
            "name": "Test User",
            "email": "test@example.com",
            "phone": "9876543210",
            "product_service": "Heavy Structures",
            "material_type": "Carbon Steel (CS)",
            "quantity": "5 units",
            "delivery_location": "Raipur",
            "timeline": "Standard (2-4 weeks)"
            # Missing company_name
        }
        
        response = requests.post(f"{BASE_URL}/api/rfq", data=form_data)
        assert response.status_code == 422, f"Expected 422 for validation error, got {response.status_code}"
        print("✓ RFQ form validation working - missing company returns 422")


class TestAdminEndpoints:
    """Test admin endpoints for retrieving submissions"""
    
    def test_admin_contacts_endpoint(self):
        """Test retrieving contact submissions via admin endpoint"""
        response = requests.get(f"{BASE_URL}/api/admin/contacts")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert isinstance(data, list), "Expected a list of contacts"
        
        if len(data) > 0:
            # Verify contact structure
            contact = data[0]
            required_fields = ["id", "name", "email", "phone", "requirement_type", "message", "status"]
            for field in required_fields:
                assert field in contact, f"Missing field: {field}"
        
        print(f"✓ Admin contacts endpoint working: {len(data)} contacts retrieved")
    
    def test_admin_rfqs_endpoint(self):
        """Test retrieving RFQ submissions via admin endpoint"""
        response = requests.get(f"{BASE_URL}/api/admin/rfqs")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert isinstance(data, list), "Expected a list of RFQs"
        
        if len(data) > 0:
            # Verify RFQ structure
            rfq = data[0]
            required_fields = ["id", "name", "company_name", "email", "phone", "product_service", "status"]
            for field in required_fields:
                assert field in rfq, f"Missing field: {field}"
        
        print(f"✓ Admin RFQs endpoint working: {len(data)} RFQs retrieved")


class TestSubmissionAndRetrieval:
    """Test end-to-end submission and retrieval flow"""
    
    def test_contact_submission_appears_in_admin(self):
        """Test that a submitted contact appears in admin endpoint"""
        test_id = str(uuid.uuid4())[:8]
        unique_name = f"TEST_AdminCheck_{test_id}"
        
        # Submit contact
        form_data = {
            "name": unique_name,
            "email": f"admin_check_{test_id}@example.com",
            "phone": "9876543210",
            "requirement_type": "General Enquiry",
            "message": "Testing admin retrieval"
        }
        
        submit_response = requests.post(f"{BASE_URL}/api/contact", data=form_data)
        assert submit_response.status_code == 200
        submitted_id = submit_response.json()["id"]
        
        # Retrieve from admin
        admin_response = requests.get(f"{BASE_URL}/api/admin/contacts")
        assert admin_response.status_code == 200
        
        contacts = admin_response.json()
        found = any(c.get("id") == submitted_id for c in contacts)
        assert found, f"Submitted contact {submitted_id} not found in admin list"
        
        print(f"✓ Contact submission verified in admin: {submitted_id}")
    
    def test_rfq_submission_appears_in_admin(self):
        """Test that a submitted RFQ appears in admin endpoint"""
        test_id = str(uuid.uuid4())[:8]
        unique_name = f"TEST_RFQAdminCheck_{test_id}"
        
        # Submit RFQ
        form_data = {
            "name": unique_name,
            "company_name": f"Admin Check Co {test_id}",
            "email": f"rfq_admin_{test_id}@example.com",
            "phone": "9876543210",
            "product_service": "Piping (CS/SS/Duplex)",
            "material_type": "Stainless Steel (SS304/SS316)",
            "quantity": "10 meters",
            "delivery_location": "Mumbai",
            "timeline": "Flexible (1-2 months)"
        }
        
        submit_response = requests.post(f"{BASE_URL}/api/rfq", data=form_data)
        assert submit_response.status_code == 200
        submitted_id = submit_response.json()["id"]
        
        # Retrieve from admin
        admin_response = requests.get(f"{BASE_URL}/api/admin/rfqs")
        assert admin_response.status_code == 200
        
        rfqs = admin_response.json()
        found = any(r.get("id") == submitted_id for r in rfqs)
        assert found, f"Submitted RFQ {submitted_id} not found in admin list"
        
        print(f"✓ RFQ submission verified in admin: {submitted_id}")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
