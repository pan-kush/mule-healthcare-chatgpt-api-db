%dw 2.0
output application/json
---
{
	status : if (error.errorType.identifier contains "SERVICE_UNAVAILABLE") ("503") 
			else if (error.errorType.identifier contains "INTERNAL_SERVER_ERROR") ("500") 
			else if (error.errorType.identifier contains "UNAUTHORIZED") ("401") 
			else if (error.errorType.identifier contains "FORBIDDEN") ("403") 
			else if (error.errorType.identifier contains "BAD_REQUEST") ("400")
			else if (error.errorType.identifier contains "NOT_FOUND") ("404")
			else if (error.errorType.identifier contains "METHOD_NOT_ALLOWED") ("405")
			else if (error.errorType.identifier contains "NOT_ACCEPTABLE") ("406")
			else if (error.errorType.identifier contains "UNSUPPORTED_MEDIA_TYPE") ("415")
			else if (error.errorType.identifier contains "NOT_IMPLEMENTED") ("501")
			else "500"
}