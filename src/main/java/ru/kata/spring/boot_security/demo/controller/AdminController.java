package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;
import ru.kata.spring.boot_security.demo.service.UserServiceImpl;

import java.security.Principal;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public AdminController(UserServiceImpl userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping
    public String showAllUsers(Model model, Principal principal) {
        model.addAttribute("user", userService.findByUsername(principal.getName()));
        model.addAttribute("users", userService.getAllUsers());
        model.addAttribute("roles", roleService.getRoles());
        model.addAttribute("newUser", new User());
        return "admin";
    }

    @GetMapping("/user/{id}")
    public String showUser(@PathVariable Long id, Model model) {
        model.addAttribute("user", userService.getUserById(id));
        return "user";
    }

    @PostMapping()
    public String create(@ModelAttribute User user) {
        userService.saveUser(user);
        return "redirect:/admin";
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        userService.deleteUser(id);
        return "redirect:/admin";
    }

    @PatchMapping("/edit/{id}")
    public String updateUser(@ModelAttribute User user, @PathVariable Long id) {
        userService.updateUser(id, user);
        return "redirect:/admin";
    }

}
