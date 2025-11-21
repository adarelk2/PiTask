# PiTask – Project Architecture & Structure

This README summarizes the architectural analysis and recommended structure for the PiTask project based on the uploaded source.

## Project Overview
PiTask is a full‑stack web application built with Node.js and Express, implementing modular MVC principles, multi‑language support, logging, and user/task management flows. The project demonstrates mid‑level architectural thinking, separation of concerns, and feature‑based controllers/services.

## Key Architectural Principles

### 1. **Controllers as Classes (PascalCase)**
All controllers represent high‑level request handlers and should use class‑based structure. Naming follows:
```
AuthController.js
UserController.js
PaymentController.js
```

### 2. **Service Layer (Business Logic)**
Services contain logic not tied to HTTP or routing. Each feature has a matching service:
```
AuthService.js
TaskService.js
ProfileService.js
```

### 3. **Model Layer**
Holds DB logic or data access responsibilities.

### 4. **Middleware**
Auth, language, validation, and logging layers applied between request and controller.

### 5. **Utils & Core Helpers**
Shared utilities for logging, config parsing, date utilities, or helper functions.

### 6. **Views & Public Assets**
Static files in `public/` and templates in `views/`.

### 7. **Locales**
Multi‑language JSON definitions:
```
en.json
he.json
vi.json
zh.json
```

### 8. **Cron Jobs**
Background scripts such as KD updates or cleanup tasks.

---

## Final Recommended Folder Hierarchy
(Using only existing files — reorganized, renamed where necessary)

```
src/
  app.js
  server.js

  config/
    config.js
    database.js
    env.js
    production.js
    development.js

  controllers/
    AuthController.js
    BuyPiController.js
    CreateTaskController.js
    HomeController.js
    LogAnalysisController.js
    LoginController.js
    PaymentController.js
    PolicyController.js
    ProfileController.js
    SettingsController.js
    StatisticsController.js
    TermsController.js
    TestnetController.js
    UserController.js
    WhitePaperController.js

  services/
    (existing service files)

  models/
    (existing models)

  middleware/
    auth.js
    validate_user.js
    error_handler.js
    logger_middleware.js

  utils/
    logger.js
    log_reader.js
    db_connection.js
    helpers.js
    config_utils.js

  routes/
    paymentRoutes.js
    authRoutes.js
    userRoutes.js
    taskRoutes.js

  views/
    (existing templates)

  public/
    css/
    js/
    images/
    assets/

  locales/
    en.json
    he.json
    zh.json
    vi.json

  cron/
    kd_update.js
    auto_cleanup.js

  logs/
    app.log
    errors.log
    payments.log

package.json
README.md
```

---

## SOLID Notes
### **Liskov Substitution Principle**
Avoid placing methods in a parent class that *not all* children can meaningfully implement.

**Example:**  
A `Bird` class must not contain `fly()` if `Penguin` cannot fly.  
Use either:
- `Flyable` interface  
- `FlyingBird` subclass  
- or remove the method from the parent

---

## Missing Components (for future mid‑level quality)
- Automated testing (unit + integration)
- Mock DB layer
- Route-level validation consistency
- Naming standardization

---

## Conclusion
PiTask demonstrates strong modularity and mid‑level architectural patterns.  
With improved naming consistency, complete class‑based controllers, and a test suite, the project aligns fully with professional production standards.
