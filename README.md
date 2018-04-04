# express-force-https-schema

## Installation

```
$ npm install express-force-https-schema
```

## Description

Very simple configurable express middleware that forces https schema based on x-forwarded-proto header.

The x-forwarded-proto is used by Heroku, AWS ELB and others to tell which schema the request was made with.

## Usage

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

## Options

| Key             | Default           |
| --------------- | ----------------- |
| enabled         | true              |
| userAgentHeader | user-agent        |
| schemaHeader    | x-forwarded-proto |
| skipUserAgents  | null              |

## Test

```
npm test
```
