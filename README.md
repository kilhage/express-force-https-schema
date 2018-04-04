## express-force-https-schema

# Usage

```javascript
import { forceHttpsSchema } from "express-force-https-schema";

const app = express();

app.use(
  forceHttpsHandler({
    enabled: process.env.FORCE_HTTPS === "true",
    skipUserAgents: /ELB-HealthChecker/i
  })
);
```

# Options

| Key             | Default           |
| --------------- | ----------------- |
| enabled         | true              |
| userAgentHeader | user-agent        |
| schemaHeader    | x-forwarded-proto |
| skipUserAgents  | null              |
