package com.example.application.exceptions;

public class MinIOFileNotFoundException extends Exception {
    public MinIOFileNotFoundException() {
        super();
    }

    public MinIOFileNotFoundException(String message) {
        super(message);
    }

    public MinIOFileNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public MinIOFileNotFoundException(Throwable cause) {
        super(cause);
    }

    protected MinIOFileNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
