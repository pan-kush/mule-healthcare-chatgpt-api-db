%dw 2.0
output application/json

var inputString = payload
var orderIdsString = inputString replace /(.*\[)|(].*)/ with ""

---
(orderIdsString splitBy ",") map (id) -> trim(id)
