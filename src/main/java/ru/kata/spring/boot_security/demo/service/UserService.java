package ru.kata.spring.boot_security.demo.service;


import ru.kata.spring.boot_security.demo.model.User;

public interface UserService {

    User findByUsername(String username);

}
