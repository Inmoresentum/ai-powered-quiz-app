package com.example.application.exceptions;

public class MinIOFileCreationException extends Exception {
    public MinIOFileCreationException() {
    }

    public MinIOFileCreationException(String message) {
        super(message);
    }

    public MinIOFileCreationException(String message, Throwable cause) {
        super(message, cause);
    }

    public MinIOFileCreationException(Throwable cause) {
        super(cause);
    }

    public MinIOFileCreationException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
