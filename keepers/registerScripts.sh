#register Desposit
curl -X POST \
http://localhost:8060/api/rest/v1/event-filter \
-H 'Cache-Control: no-cache' \
-H 'Content-Type: application/json' \
-H 'Postman-Token: 616712a3-bf11-bbf5-b4ac-b82835779d51' \
-d '{
"id": "Deposit",
"contractAddress": "0xb39CA142159DF2aE60857113c7De2d7FB8637dC7",
"eventSpecification": {
  "eventName": "Deposit",
  "nonIndexedParameterDefinitions": [
    {"position": 0, "type": "ADDRESS"},
    {"position": 1, "type": "UINT256"} ] }
}'

#register PaymentScheduleCreated
curl -X POST \
http://localhost:8060/api/rest/v1/event-filter \
-H 'Cache-Control: no-cache' \
-H 'Content-Type: application/json' \
-H 'Postman-Token: 616712a3-bf11-bbf5-b4ac-b82835779d51' \
-d '{
"id": "PaymentScheduleCreated",
"contractAddress": "0x4a936E7Ce91FD8A47bbe9aeBFabE15AA13A11232",
"eventSpecification": {
  "eventName": "PaymentScheduleCreated",
  "nonIndexedParameterDefinitions": [
    {"position": 0, "type": "BYTES32"},
    {"position": 1, "type": "UINT256"},
    {"position": 2, "type": "ADDRESS"},
    {"position": 3, "type": "ADDRESS"},
    {"position": 4, "type": "UINT256"}] }
}'
#register PaymentScheduleNextPaymentDateSet
curl -X POST \
http://localhost:8060/api/rest/v1/event-filter \
-H 'Cache-Control: no-cache' \
-H 'Content-Type: application/json' \
-H 'Postman-Token: 616712a3-bf11-bbf5-b4ac-b82835779d51' \
-d '{
"id": "NextPaymentDateSet",
"contractAddress": "0x4a936E7Ce91FD8A47bbe9aeBFabE15AA13A11232",
"eventSpecification": {
  "eventName": "NextPaymentDateSet",
  "nonIndexedParameterDefinitions": [
    {"position": 0, "type": "BYTES32"},
    {"position": 1, "type": "UINT256"} ] }
}'
