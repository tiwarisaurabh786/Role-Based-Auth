package com.rbac.authsystem.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ContentController {

    @GetMapping("/public")
    public String publicContent() {
        return "This is public content available to everyone";
    }

    @GetMapping("/user")
    @PreAuthorize("hasAuthority('USER')")
    public String userContent() {
        return "This is user-specific content - USER role required";
    }

    @GetMapping("/admin")
    @PreAuthorize("hasAuthority('ADMIN')")
    public String adminContent() {
        return "This is admin-only content - ADMIN role required";
    }
}