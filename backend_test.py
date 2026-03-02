import requests
import sys
from datetime import datetime
import os
import base64

# Use the public endpoint URL from frontend .env
BACKEND_URL = "https://fabrication-pro-3.preview.emergentagent.com"

class MWAAPITester:
    def __init__(self, base_url=BACKEND_URL):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None, files=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint.lstrip('/')}"
        
        if headers is None:
            headers = {}
        
        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=30)
            elif method == 'POST':
                if files:
                    response = requests.post(url, data=data, files=files, headers=headers, timeout=30)
                elif data:
                    if 'Content-Type' not in headers:
                        headers['Content-Type'] = 'application/json'
                    response = requests.post(url, json=data, headers=headers, timeout=30)
                else:
                    headers['Content-Type'] = 'application/json'
                    response = requests.post(url, json={}, headers=headers, timeout=30)
            elif method == 'PATCH':
                response = requests.patch(url, json=data, headers=headers, timeout=30)

            print(f"   Status: {response.status_code}")
            
            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed")
                try:
                    result = response.json()
                    return True, result
                except:
                    return True, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_detail = response.json()
                    print(f"   Error: {error_detail}")
                except:
                    print(f"   Response: {response.text}")
                    
                self.failed_tests.append(f"{name}: Expected {expected_status}, got {response.status_code}")
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.failed_tests.append(f"{name}: {str(e)}")
            return False, {}

    def test_basic_api_status(self):
        """Test basic API health"""
        print("\n=== Basic API Health Tests ===")
        return self.run_test("API Root", "GET", "api/", 200)

    def test_contact_form_submission(self):
        """Test contact form submission with all required fields"""
        print("\n=== Contact Form Tests ===")
        
        # Test with all required fields
        contact_data = {
            'name': 'John Doe',
            'email': 'john.doe@example.com',
            'phone': '+919876543210',
            'requirement_type': 'Structural Steel Fabrication',
            'message': 'We need structural steel fabrication for our industrial project. Please provide quote.',
            'company_name': 'Test Industries Ltd'
        }
        
        success, _ = self.run_test(
            "Contact Form - Complete",
            "POST",
            "api/contact",
            200,
            data=contact_data
        )
        
        # Test with missing required field
        incomplete_data = {
            'name': 'Jane Doe',
            'email': 'jane@example.com',
            # Missing phone, requirement_type, message
        }
        
        self.run_test(
            "Contact Form - Missing Fields",
            "POST", 
            "api/contact",
            422,  # Validation error expected
            data=incomplete_data
        )
        
        return success

    def test_contact_form_with_file(self):
        """Test contact form submission with file upload"""
        print("\n=== Contact Form with File Upload ===")
        
        # Create a test file (simulate PDF)
        test_file_content = b"This is a test PDF content for MWA Industries"
        test_file = ('test_drawing.pdf', test_file_content, 'application/pdf')
        
        contact_data = {
            'name': 'Bob Smith',
            'email': 'bob.smith@example.com',
            'phone': '+918765432109',
            'requirement_type': 'Pressure Vessel Fabrication',
            'message': 'Please review attached drawing and provide quote.',
            'company_name': 'Smith Engineering'
        }
        
        return self.run_test(
            "Contact Form - With File",
            "POST",
            "api/contact",
            200,
            data=contact_data,
            files={'file': test_file}
        )

    def test_rfq_form_submission(self):
        """Test RFQ form submission"""
        print("\n=== RFQ Form Tests ===")
        
        rfq_data = {
            'name': 'Alice Johnson',
            'company_name': 'Johnson Industries',
            'email': 'alice@johnson-ind.com',
            'phone': '+917654321098',
            'product_service': 'Structural Steel Fabrication',
            'material_type': 'Carbon Steel',
            'quantity': '50 MT',
            'delivery_location': 'Mumbai, Maharashtra',
            'timeline': 'Within 30 days',
            'notes': 'High quality structural steel required for industrial building construction.'
        }
        
        success, _ = self.run_test(
            "RFQ Form - Complete",
            "POST",
            "api/rfq",
            200,
            data=rfq_data
        )
        
        # Test with missing required fields
        incomplete_rfq = {
            'name': 'Test User',
            'email': 'test@example.com'
            # Missing other required fields
        }
        
        self.run_test(
            "RFQ Form - Missing Fields",
            "POST",
            "api/rfq", 
            422,  # Validation error expected
            data=incomplete_rfq
        )
        
        return success

    def test_rfq_form_with_file(self):
        """Test RFQ form submission with file upload"""
        print("\n=== RFQ Form with File Upload ===")
        
        # Create a test DWG file (simulate)
        test_file_content = b"DWG file content for fabrication specifications"
        test_file = ('project_drawing.dwg', test_file_content, 'application/octet-stream')
        
        rfq_data = {
            'name': 'Charlie Brown',
            'company_name': 'Brown Construction',
            'email': 'charlie@brownconstruction.com',
            'phone': '+916543210987',
            'product_service': 'Piping Systems',
            'material_type': 'Stainless Steel',
            'quantity': '25 MT',
            'delivery_location': 'Delhi, NCR',
            'timeline': 'Within 45 days',
            'notes': 'Please review attached drawing for detailed specifications.'
        }
        
        return self.run_test(
            "RFQ Form - With File",
            "POST",
            "api/rfq",
            200,
            data=rfq_data,
            files={'file': test_file}
        )

    def test_admin_endpoints(self):
        """Test admin endpoints for viewing submissions"""
        print("\n=== Admin Endpoints Tests ===")
        
        # Test getting contact submissions
        contacts_success, _ = self.run_test(
            "Admin - Get Contacts",
            "GET",
            "api/admin/contacts",
            200
        )
        
        # Test getting RFQ submissions  
        rfqs_success, _ = self.run_test(
            "Admin - Get RFQs",
            "GET",
            "api/admin/rfqs", 
            200
        )
        
        return contacts_success and rfqs_success

    def test_status_endpoints(self):
        """Test status check endpoints"""
        print("\n=== Status Check Tests ===")
        
        # Test create status check
        status_data = {
            'client_name': 'Test Client'
        }
        
        success, response = self.run_test(
            "Status Check - Create",
            "POST",
            "api/status",
            200,
            data=status_data
        )
        
        # Test get status checks
        get_success, _ = self.run_test(
            "Status Check - Get All",
            "GET",
            "api/status",
            200
        )
        
        return success and get_success

def main():
    print("🏭 MWA Industries API Testing Suite")
    print("=" * 50)
    
    tester = MWAAPITester()
    
    # Run all tests
    tests_results = []
    
    tests_results.append(tester.test_basic_api_status())
    tests_results.append(tester.test_contact_form_submission()) 
    tests_results.append(tester.test_contact_form_with_file())
    tests_results.append(tester.test_rfq_form_submission())
    tests_results.append(tester.test_rfq_form_with_file())
    tests_results.append(tester.test_admin_endpoints())
    tests_results.append(tester.test_status_endpoints())
    
    # Print final results
    print("\n" + "=" * 50)
    print(f"📊 Final Results:")
    print(f"   Tests Run: {tester.tests_run}")
    print(f"   Tests Passed: {tester.tests_passed}")
    print(f"   Tests Failed: {tester.tests_run - tester.tests_passed}")
    print(f"   Success Rate: {(tester.tests_passed / tester.tests_run * 100):.1f}%")
    
    if tester.failed_tests:
        print("\n❌ Failed Tests:")
        for failed in tester.failed_tests:
            print(f"   - {failed}")
    
    # Return appropriate exit code
    if tester.tests_passed == tester.tests_run:
        print("\n🎉 All tests passed!")
        return 0
    else:
        print(f"\n⚠️  {tester.tests_run - tester.tests_passed} tests failed")
        return 1

if __name__ == "__main__":
    sys.exit(main())