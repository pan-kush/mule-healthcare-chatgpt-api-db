%dw 2.0
output application/json
---
{
"error_description": error.description,
"error_type": error.errorType.namespace ++ ":" ++ error.errorType.identifier,
"error_cause": p('http.any.message'),
"transaction_id": vars.transactionId default correlationId,
"timestamp": now()
}