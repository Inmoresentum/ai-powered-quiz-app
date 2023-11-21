package com.example.application.exceptions;

public class FileContainsHarmFulContentException  extends Exception {
    public FileContainsHarmFulContentException() {
    }

    public FileContainsHarmFulContentException(String message) {
        super(message);
    }

    public FileContainsHarmFulContentException(String message, Throwable cause) {
        super(message, cause);
    }

    public FileContainsHarmFulContentException(Throwable cause) {
        super(cause);
    }

    public FileContainsHarmFulContentException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
