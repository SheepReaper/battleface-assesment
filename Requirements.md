# CODING CHALLENGE

## Explanation of Task

1. You can use any technology/ies to complete this code challenge.
2. Develop the backend API method call mentioned in the API Documentation.
3. Develop a simple form page that can handle user input, call the API method and then 
display the results.
4. Some requirements were left open to interpretation to test your ability in making correct 
assumptions.
5. The format of the deliverable can either be in the form of a compressed file such as a zip 
file or as a GitHub link.
6. Expected duration of task: 1 to 2 hours.

You will be judged on:

- [ ] Correct use of coding standards and practices.
- [ ] Overall implementation of the solution.
- [ ] Ability to understand requirements.

You will not be judged on:

- [ ] Frontend Styling.

## API Documentation

### General Points
- [ ] The API conforms to the REST architecture.
- [ ] Data sent in the request and response bodies are encoded in JSON.
- [ ] Access to the API is restricted via authorised JWT tokens.
- [ ] The requests must include these two required HTTP headers:

Key           | Value                 
------------- | -----
Content-Type  | application/json
Authorization | Bearer <access-token>

**Type of Request**: POST

**URL Endpoint**: /quotation

**Request Body Parameters**: All the below parameters are required

Key | Description | Example
--- | ----------- | -------
age | Comma separated list of insureds’ ages. First value must be 18 or over. 0 is not a valid age. | “28,16”
currency_id | Currency code in ISO 4217 format.      | “EUR”
start_date  | Start date of trip in ISO 8601 format. | “2020-10-01”
end_date    | End date of trip in ISO 8601 format.   | “2020-10-30”


**Response Body Parameters**

Key | Description | Example
--- | ----------- | -------
total | Total Price of Policy | 28.43
currency_id | Currency code in ISO 4217 format. | “EUR”
quotation_id | Quotation ID for your reference. | 1

**Total Calculation**

- Total = Fixed Rate * Age Load * Trip Length
- Fixed rate = 3 per day (EUR, GBP or USD – no need for currency conversion)

**Age Load Table**

Age   | Load
----- | ----
18-30 | 0.6
31-40 | 0.7
41-50 | 0.8
51-60 | 0.9
61-70 | 1

Trip length is inclusive of both start date and end date so a start date of 2020-10-01 and an end date of 2020-10-30 will constitute a trip length of 30 days.

**Worked Example for two clients aged 28 and 35 for a trip length of 30 days:**

- Total = (3 * 0.6 * 30) + (3 * 0.7 * 30) = 117.00