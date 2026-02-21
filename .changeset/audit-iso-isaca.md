---
"@osprotocol/schema": major
---

refactor(checks): align AuditEntry with ISO 27001 / ISACA standards

BREAKING CHANGES:
- `passed: boolean` replaced with `opinion: AuditOpinion`
- New required fields: `objectives`, `scope`, `findings`
- `Audit` interface changed from `log/get/list` to `parse/write/query`

New types:
- `AuditOpinion`: 'unqualified' | 'qualified' | 'adverse' | 'disclaimer'
- `AuditFindings`: { critical, major, minor }
- `AuditQuery`: filter criteria for querying entries
