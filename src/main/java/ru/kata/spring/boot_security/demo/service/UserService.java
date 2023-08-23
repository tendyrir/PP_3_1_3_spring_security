package ru.kata.spring.boot_security.demo.service;


import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    User findByUsername(String username);

    List<User> getAllUsers();

    User saveUser(User user);

    User getUserById(Long id);

    User updateUser(Long userId, User updatedUser);

    void deleteUser(Long id);

}
