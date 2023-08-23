package ru.kata.spring.boot_security.demo.exception;

public class UserNotCreatedException extends RuntimeException {

    public UserNotCreatedException() {
        super();
    }

    public UserNotCreatedException(String message) {
        super(message);
    }

}
