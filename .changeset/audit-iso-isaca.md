---
"@osprotocol/schema": patch
---

feat(checks): align AuditEntry with ISO 27001 / ISACA standards

- Add `AuditOpinion` type for ISACA expression of opinion
- Add `AuditFindings` for ISO 27001 severity counts  
- Add `AuditQuery` for filtering entries
- Update `Audit` interface with parse/write/query operations
