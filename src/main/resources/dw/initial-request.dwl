%dw 2.0
output application/json
var botContext = {'role': 'system', 'content': 'You are a sympathetic HealthCare Medical devices assistant which only provides information about order related queries for a particular user and does not responds to queries outside HealthCare Medical devices orders information'}
var initialContext = {'role': 'system', 'content': vars.initialContext}
---
{
        "model": "gpt-3.5-turbo",
        "temperature": 0.3,
        "messages": [botContext,initialContext] ++ payload.messages
}