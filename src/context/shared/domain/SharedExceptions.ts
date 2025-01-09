import Exception from "@utils/error/Exception";

export default {
  UNDEFINED_VALUE_OBJECT: {
    code: "3dba1ef2-c021-4c31-8bab-5123494ed883",
    message: "Undefined Value Object"
  },
  INVALID_VALUE: {
    code: "5fd5aad5-e160-4c50-a1c8-ea4a5fe28780",
    message: "Value must be valid"
  },
  EMPTY_VALUE: {
    code: "f7feec68-0f0a-44a7-9167-c698e13442fd",
    message: "Not allowed to be empty"
  },
  FIND_DB_CREDENTIALS_ERROR: {
    code: "3e2300f2-e535-49be-a738-b00d8302fbd6",
    message: "Some Error trying to find database credentials"
  },
  INVALID_UUID: {
    code: "14d84e22-509d-4769-8a1a-3ad4a0ba1c75",
    message: "Invalid UUID"
  },
  COMMAND_NOT_REGISTERED: {
    code: "b961ddd0-96a2-4e67-94b6-83fc9e5730d1",
    message: "Command not registered"
  },
  QUERY_NOT_REGISTERED: {
    code: "f8509225-1024-4a1c-a41d-3907df636468",
    message: "Query not registered"
  },
  INVALID_EMAIL: {
    code: "c82eadeb-8720-41af-ad1c-2e412c4e7ede",
    message: "Invalid email"
  }

} satisfies Record<string, Exception>;
