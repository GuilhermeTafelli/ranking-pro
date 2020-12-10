const ErrorCode = {
    USER_ALREDY_EXISTS: {
        code: "USER_ALREDY_EXISTS",
        message: "User already exists."
    },    
    CREATE_USER_FAILED: {
        code: "CREATE_USER_FAILED",
        message: "Error on create new user."
    },
        CREATE_USER_FAILED: {
        code: "CREATE_USER_FAILED",
        message: "Error on create new user."
    },
    USER_NOT_FOUND: {
        code: "USER_NOT_FOUND",
        message: "User not found."
    },
    SOCIAL_MEDIA_NOT_FOUND: {
        code: "SOCIAL_MEDIA_NOT_FOUND",
        message: "Social Media not found."
    },
    GAMIFICATION_CODE_NOT_FOUND: {
        code: "GAMIFICATION_CODE_NOT_FOUND",
        message: "Gamification code not found."
    },
    INVALID_AUTHENTICATION: {
        code: "INVALID_AUTHENTICATION",
        message: "Invalid authentication."
    },
    AUTHENTICATION_FAILED: {
        code: "AUTHENTICATION_FAILED",
        message: "Authentication failed."
    },
    FAILED_SEND_EMAIL: {
        code: "FAILED_SEND_EMAIL",
        message: " Failed to send email."
    },
    FAILED_SEND_RESET_PASSWORD_TOKEN: {
        code: "FAILED_SEND_RESET_PASSWORD_TOKEN",
        message: " Failed to send reset password email with token."
    },
    INVALID_TOKEN: {
        code: "INVALID_TOKEN",
        message: "Invalid Token."
    },
    TOKEN_EXPIRED: {
        code: "TOKEN_EXPIRED",
        message: "Token expired."
    },
    FAILED_RESET_PASSWORD: {
        code: "FAILED_RESET_PASSWORD",
        message: "Failed to reset password."
    },
    UPDATE_USER_FAILED:{
        code: "UPDATE_USER_FAILED",
        message: "Failed to update user infos."
    },
    SOCIAL_MEDIA_ALREDY_EXISTS: {
        code: "SOCIAL_MEDIA_ALREDY_EXISTS",
        message: "Social media already exists."
    },    
    GAMIFICATION_CODE_ALREDY_EXISTS: {
        code: "GAMIFICATION_CODE_ALREDY_EXISTS",
        message: "Gamification Code already exists."
    }, 
    GAMIFICATION_CODE_ALREDY_REGISTERED: {
        code: "GAMIFICATION_CODE_ALREDY_REGISTERED",
        message: "Gamification Code already registered."
    }, 
    UPDATE_SOCIAL_MEDIA_GAMIFICATION_CODES_FAILED: {
        code: "UPDATE_SOCIAL_MEDIA_GAMIFICATION_CODES_FAILED",
        message: "Error on update social media's gamification codes."
    },
    CREATE_GAMIFICATION_CODES_FAILED: {
        code: "CREATE_GAMIFICATION_CODES_FAILED",
        message: "Error on create new gamification code."
    },
    GET_SOCIAL_MEDIA_BY_ID_FAILED: {
        code: "GET_SOCIAL_MEDIA_BY_ID_FAILED",
        message: "Error on get social media by id."
    },
    PERMISSION_DENIED: {
        code: "PERMISSION_DENIED",
        message: "Permission denied for this service"
    }
}

module.exports = ErrorCode