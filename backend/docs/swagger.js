const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task & Project Management API",
      version: "1.0.0",
      description: `Backend API for a Task & Project Management System built with Node.js, Express, PostgreSQL, and JWT authentication.

## First time? How to use JWT token in Swagger

1. Get a token:
   - Use **POST /api/auth/register** (first time) or **POST /api/auth/login**.
   - Click **Try it out** → fill the body → **Execute**.
   - Copy the \`token\` from the response.

2. Authorize in Swagger:
   - Click the **Authorize** button (top-right).
   - Paste: \`Bearer <token>\`
     - Example: \`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...\`
   - Click **Authorize** → Close.

3. Call protected endpoints:
   - Swagger will automatically send \`Authorization: Bearer <token>\`.

Notes:
- If you see **401**, login again and re-authorize (token missing/expired).
- Some endpoints require roles (Manager/Admin/Admin).`,
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Local server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description:
            "Paste your JWT here as: `Bearer <token>` (get token from POST /api/auth/login or /api/auth/register).",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
            email: { type: "string", format: "email" },
            password: { type: "string" },
            role: { type: "string" },
            created_at: { type: "string", format: "date-time" },
          },
        },
        Project: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
            description: { type: "string" },
            start_date: { type: "string", format: "date" },
            end_date: { type: "string", format: "date" },
            status: { type: "string" },
            created_by: { type: "integer" },
            created_at: { type: "string", format: "date-time" },
          },
        },
        Task: {
          type: "object",
          properties: {
            id: { type: "integer" },
            title: { type: "string" },
            description: { type: "string" },
            priority: { type: "string" },
            status: { type: "string" },
            due_date: { type: "string", format: "date" },
            assigned_user: { type: "integer", nullable: true },
            project_id: { type: "integer", nullable: true },
          },
        },
        Comment: {
          type: "object",
          properties: {
            id: { type: "integer" },
            task_id: { type: "integer" },
            user_id: { type: "integer" },
            comment_text: { type: "string" },
            created_at: { type: "string", format: "date-time" },
          },
        },
        ProjectMember: {
          type: "object",
          description: "Join table between projects and users",
          properties: {
            project_id: { type: "integer" },
            user_id: { type: "integer" },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    paths: {
      // ================= AUTH =================
      "/api/auth/register": {
        post: {
          tags: ["Auth"],
          summary: "Register a new user",
          security: [],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  required: ["name", "email", "password"],
                  properties: {
                    name: { type: "string" },
                    email: { type: "string" },
                    password: { type: "string" },
                    role: {
                      type: "string",
                      enum: ["Admin", "Manager", "User"],
                    },
                  },
                },
              },
            },
          },
          responses: { 201: { description: "User registered" } },
        },
      },

      "/api/auth/login": {
        post: {
          tags: ["Auth"],
          summary: "Login",
          security: [],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  required: ["email", "password"],
                  properties: {
                    email: { type: "string" },
                    password: { type: "string" },
                  },
                },
              },
            },
          },
          responses: { 200: { description: "JWT token returned" } },
        },
      },

      // ================= USERS =================
      "/api/users": {
        get: {
          tags: ["Users"],
          summary: "Get all users (for dropdown)",
          responses: { 200: { description: "Users list" } },
        },
      },

      // ================= ADMIN =================
      "/api/admin/users": {
        get: {
          tags: ["Admin"],
          summary: "Get users (Admin only)",
          parameters: [
            { name: "search", in: "query", schema: { type: "string" } },
            { name: "role", in: "query", schema: { type: "string" } },
          ],
          responses: { 200: { description: "Users list" } },
        },
      },

      "/api/admin/user-role": {
        put: {
          tags: ["Admin"],
          summary: "Update user role",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  required: ["userId", "role"],
                  properties: {
                    userId: { type: "integer" },
                    role: {
                      type: "string",
                      enum: ["Admin", "Manager", "User"],
                    },
                  },
                },
              },
            },
          },
          responses: { 200: { description: "Updated" } },
        },
      },

      "/api/admin/users/{id}": {
        delete: {
          tags: ["Admin"],
          summary: "Delete user (cannot delete yourself)",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "integer" },
            },
          ],
          responses: { 200: { description: "User deleted" } },
        },
      },

      // ================= PROJECT =================
      "/api/projects": {
        get: {
          tags: ["Projects"],
          summary: "Get all projects",
          responses: { 200: { description: "Projects list" } },
        },
        post: {
          tags: ["Projects"],
          summary: "Create project (Manager/Admin)",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  required: ["name"],
                  properties: {
                    name: { type: "string" },
                    description: { type: "string" },
                    start_date: { type: "string" },
                    end_date: { type: "string" },
                    status: { type: "string" },
                  },
                },
              },
            },
          },
          responses: { 201: { description: "Created" } },
        },
      },

      "/api/projects/{id}": {
        get: {
          tags: ["Projects"],
          summary: "Get project",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "integer" },
            },
          ],
          responses: { 200: { description: "Project found" } },
        },
        put: {
          tags: ["Projects"],
          summary: "Update project (Manager/Admin)",
          responses: { 200: { description: "Updated" } },
        },
        delete: {
          tags: ["Projects"],
          summary: "Delete project (Manager/Admin)",
          responses: { 204: { description: "Deleted" } },
        },
      },

      // ================= TASK =================
      "/api/tasks": {
        get: {
          tags: ["Tasks"],
          summary: "Get tasks (User → own tasks, Manager/Admin → all)",
          responses: { 200: { description: "Tasks list" } },
        },
        post: {
          tags: ["Tasks"],
          summary: "Create task (Manager/Admin)",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  required: ["title"],
                  properties: {
                    title: { type: "string" },
                    description: { type: "string" },
                    priority: { type: "string" },
                    due_date: { type: "string" },
                    assigned_user_id: { type: "integer" }, // ✅ matches backend
                    project_id: { type: "integer" },
                  },
                },
              },
            },
          },
          responses: { 201: { description: "Created" } },
        },
      },

      "/api/tasks/{id}": {
        get: {
          tags: ["Tasks"],
          summary: "Get task",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "integer" },
            },
          ],
          responses: { 200: { description: "Task found" } },
        },

        put: {
          tags: ["Tasks"],
          summary: "Update task (ONLY User role can access this endpoint)",
          description: `
🚨 IMPORTANT:
- Only "User" role can call this API
- Only "status" field should be updated
- Manager/Admin cannot access this route
      `,
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  properties: {
                    status: {
                      type: "string",
                      enum: ["Pending", "In Progress", "Completed"],
                    },
                  },
                },
              },
            },
          },
          responses: { 200: { description: "Status updated" } },
        },

        delete: {
          tags: ["Tasks"],
          summary: "Delete task (Manager/Admin)",
          responses: { 204: { description: "Deleted" } },
        },
      },

      // ================= COMMENTS =================
      "/api/comments": {
        post: {
          tags: ["Comments"],
          summary: "Create comment",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  required: ["task_id", "comment_text"],
                  properties: {
                    task_id: { type: "integer" },
                    comment_text: { type: "string" },
                  },
                },
              },
            },
          },
          responses: { 201: { description: "Created" } },
        },
      },

      "/api/comments/{taskId}": {
        get: {
          tags: ["Comments"],
          summary: "Get comments by task",
          parameters: [
            {
              name: "taskId",
              in: "path",
              required: true,
              schema: { type: "integer" },
            },
          ],
          responses: { 200: { description: "Comments list" } },
        },
      },

      // ================= DASHBOARD =================
      "/api/dashboard/user": {
        get: {
          tags: ["Dashboard"],
          summary: "User dashboard (User/Manager/Admin)",
          responses: { 200: { description: "Dashboard data" } },
        },
      },

      "/api/dashboard/manager": {
        get: {
          tags: ["Dashboard"],
          summary: "Manager/Admin dashboard",
          responses: { 200: { description: "Dashboard data" } },
        },
      },
    },
  },
  apis: [],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
