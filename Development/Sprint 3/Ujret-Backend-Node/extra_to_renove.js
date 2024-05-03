// user_routes -------------------------------------------------------------------------------------------------------------------
//  create-user ✅
{
    "phone_number": "+923307582941",
    "email": "abdullaheh30@gmail.com",
    "password": "Test@123"
}

{
    "data": "fa4cf055-687f-5f6c-b8e2-0a3e04083864",
    "event_code": "1",
    "message": "User created successfully",
    "status_code": 201
}

// {{ngrokURL}}/get-user?uid=24df7747-f103-55b5-8af2-9cc97f1de5f7 ✅
{
    "data": {
        "cnic": "33876-5678987-6",
        "email": "abdullaheh25@gmail.com",
        "first_name": "abdullah",
        "gender": "3",
        "id": "24df7747-f103-55b5-8af2-9cc97f1de5f7",
        "last_name": "1",
        "otp": "2193",
        "phone_number": "+923257582941",
        "phone_number_verified": false,
        "services": []
    },
    "event_code": "1",
    "message": "User returned successfully",
    "status_code": 201
}

// {{ngrokURL}}/update-user ✅

{
    "uid": "24df7747-f103-55b5-8af2-9cc97f1de5f7",
    "user_info": {
        "cnic": "33102-9696968-5",
        "first_name": "abdullah 3",
        "last_name": "ehsan 3"
    }
}

{
    "data": null,
    "event_code": "1",
    "message": "User updated successfully",
    "status_code": 201
}


// handyman_routes -------------------------------------------------------------------------------------------------------------------
// {{ngrokURL}}/create-handyman ✅
{
    "uid": "fa4cf055-687f-5f6c-b8e2-0a3e04083864",
    "category": ["PLUMBER", "ELECTRICIAN"],
    "experience": 0,
    "about": "experience in Plumbing",
    "address": "lums university"
}

{
    "data": "9417fe0d-bfa4-4000-9dc3-eade2c29caea",
    "event_code": "1",
    "message": "Handyman created successfully",
    "status_code": 201
}

// {{ngrokURL}}/update-handyman ✅
{
    "handyman_id": "72214058-91b7-4d0d-9d06-e109c5f9ceeb",
    "handyman_info": {
        "about": "about 3",
        "experience" : 2
    }
}

{
    "data": null,
    "event_code": "1",
    "message": "Handyman updated successfully",
    "status_code": 201
}

// {{ngrokURL}}/get-handyman?handyman_id=dbcb9001-f12c-48d7-8a78-06b790d4f03a ✅
{
    "data": {
        "about": "about 3",
        "address": "lums university",
        "category": "PLUMBER",
        "experience": 2,
        "id": "9417fe0d-bfa4-4000-9dc3-eade2c29caea",
        "status": false,
        "sub_categories": [
            "1",
            "2"
        ],
        "user_id": "fa4cf055-687f-5f6c-b8e2-0a3e04083864"
    },
    "event_code": "1",
    "message": "Handyman returned successfully",
    "status_code": 201
}

// {{ngrokURL}}/get-task-categories ✅
{
    "data": [
        {
            "name": "PLUMBER"
        },
        {
            "name": "ELECTRICIAN"
        },
        {
            "name": "CARPENTER"
        },
        {
            "name": "PAINTER"
        },
        {
            "name": "TAILOR"
        },
        {
            "name": "SHIFTING"
        },
        {
            "name": "COOK"
        },
        {
            "name": "MASON"
        },
        {
            "name": "HVAC"
        },
        {
            "name": "VEHICLE_MECHANIC"
        },
        {
            "name": "VEHICLE_ELECTRICIAN"
        },
        {
            "name": "HOUSE_HELP"
        },
        {
            "name": "CAR_WASHER"
        },
        {
            "name": "DRIVERS"
        },
        {
            "name": "BABYSITTERS"
        },
        {
            "name": "DOCTORS"
        },
        {
            "name": "REAL_ESTATE_AGENTS"
        }
    ],
    "event_code": "1",
    "message": "All categories returned successfully",
    "status_code": 201
}

// {{ngrokURL}}/get-handyman-subcategories?sub_cat=tailor ✅
{
    "data": [
        {
            "name": "CLOTHING_ALTERATION"
        },
        {
            "name": "DRESSMAKING"
        },
        {
            "name": "EMBROIDERY"
        },
        {
            "name": "TAILORING"
        }
    ],
    "event_code": "1",
    "message": "All sub-categories returned successfully",
    "status_code": 201
}


// task_routes -------------------------------------------------------------------------------------------------------------------

// {{ngrokURL}}/create-task  ✅
{
    "uid": "24df7747-f103-55b5-8af2-9cc97f1de5f7",
    "category": "ELECTRICIAN",
    "sub_categories": ["BREAKER_BOX_INSTALLATION","UPS_INSTALLATION"],
    "description": "I want ELECTRICIAN for work",
    "address": "bahria enclave",
    "budget": 10,
    "duration": 1
}

{
    "data": "a89188d7-ce8e-4fb4-b89d-40f9262dd67f",
    "event_code": "1",
    "message": "Task created successfully",
    "status_code": 201
}

// {{ngrokURL}}/get-relevant-available-tasks?category=plumber  ✅
//specify category
{
    "data": [
        {
            "address": "bahria enclave",
            "budget": 10,
            "category": "PLUMBER",
            "date": "Thu, 18 Apr 2024 08:50:29 GMT",
            "description": "I want ELECTRICIAN for work",
            "duration": 1,
            "handyman_id": null,
            "service_seeker_id": "24df7747-f103-55b5-8af2-9cc97f1de5f7",
            "service_seeker_name": "abdullah 3",
            "service_seeker_number": "+923307582941",
            "status": "PENDING",
            "sub_categories": [
                "UPS_INSTALLATION",
                "BREAKER_BOX_INSTALLATION"
            ],
            "task_id": "0e9f38a6-34e0-44b7-9edb-bca7490e6b74",
            "time": "Thu, 18 Apr 2024 08:50:29 GMT"
        },
        {
            "address": "bahria enclave",
            "budget": 10,
            "category": "PLUMBER",
            "date": "Thu, 18 Apr 2024 10:08:37 GMT",
            "description": "I want ELECTRICIAN for work",
            "duration": 1,
            "handyman_id": null,
            "service_seeker_id": "1c19c29e-0414-5eba-9d00-62eae855df3f",
            "service_seeker_name": "Abdullah",
            "service_seeker_number": "+923307582941",
            "status": "PENDING",
            "sub_categories": [
                "UPS_INSTALLATION",
                "BREAKER_BOX_INSTALLATION"
            ],
            "task_id": "a89188d7-ce8e-4fb4-b89d-40f9262dd67f",
            "time": "Thu, 18 Apr 2024 10:08:37 GMT"
        }
    ],
    "event_code": "1",
    "message": "All relevant available tasks returned successfully",
    "status_code": 201
}


// {{ngrokURL}}/bid-task ✅
{
    "amount": 1200,
    "description": "koi or handyman hn m (2)",
    "task_id": "725b3757-401d-4f88-b315-91a9ab44e45b",
    "handyman_id": "9417fe0d-bfa4-4000-9dc3-eade2c29caea"
}

{
    "data": bid_id,
    "event_code": "1",
    "message": "Bid created successfully",
    "status_code": 201
}

// {{ngrokURL}}/accept-bid?bid_id=f068568d-372c-4251-a6c1-c0db4cabd110   ✅

{
    "data": null,
    "event_code": "1",
    "message": "Bid accepted successfully",
    "status_code": 201
}

// {{ngrokURL}}/get-task-bids?task_id=725b3757-401d-4f88-b315-91a9ab44e45b  ✅
{
    "data": [
        {
            "amount": 1200,
            "description": "",
            "handyman_id": "9417fe0d-bfa4-4000-9dc3-eade2c29caea",
            "name": null,
            "number": "+923307582941"
        },
        {
            "amount": 1200,
            "description": "",
            "handyman_id": "9417fe0d-bfa4-4000-9dc3-eade2c29caea",
            "name": null,
            "number": "+923307582941"
        }
    ],
    "event_code": "1",
    "message": "All task bids returned successfully",
    "status_code": 200
}

// {{ngrokURL}}/decline_bid?bid_id=f068568d-372c-4251-a6c1-c0db4cabd110  ✅
{
    "data": null,
    "event_code": "1",
    "message": "Bid declined successfully",
    "status_code": 201
}



// {{ngrokURL}}/user-mark-task-complete  ✅
{
    "task_id": "725b3757-401d-4f88-b315-91a9ab44e45b",
    "user_id": "24df7747-f103-55b5-8af2-9cc97f1de5f7",
}

{
    "data": null,
    "event_code": "1",
    "message": "Task Marked completed successfully",
    "status_code": 201
}

// {{ngrokURL}}/task-status-check?task_id=725b3757-401d-4f88-b315-91a9ab44e45b  ✅
{
    "data": task.taskStatus,
    "event_code": "1",
    "message": "Task status returned successfully",
    "status_code": 201
}

// {{ngrokURL}}/bid-status-check?bid_id=f068568d-372c-4251-a6c1-c0db4cabd110  ✅
{
    "data": bid.bidStatus,
    "event_code": "1",
    "message": "Bid status returned successfully",
    "status_code": 201
}
