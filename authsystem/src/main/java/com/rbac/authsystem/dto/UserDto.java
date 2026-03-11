package com.rbac.authsystem.dto;

public record UserDto(
    Long id,
    String name,
    String email,
    String role
) {}