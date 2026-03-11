package com.rbac.authsystem.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.rbac.authsystem.dto.RegisterRequest;
import com.rbac.authsystem.entity.User;

@Mapper(componentModel = "spring")
public interface UserMapper {
	
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);
	User toEntity (RegisterRequest request); 
}
