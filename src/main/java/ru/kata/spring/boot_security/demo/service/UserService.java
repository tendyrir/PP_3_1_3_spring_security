package ru.kata.spring.boot_security.demo.service;


import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    User findByUsername(String username);

    List<User> getAllUsers();

    void saveUser(User user);

    Optional<User> getUserById(Long id);

    void updateUser(Long userId, User updatedUser);

    void deleteUser(Long id);

}
