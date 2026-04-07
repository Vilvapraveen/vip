package com.example.adminpanel.service;

import com.example.adminpanel.dto.UpdateUserRequest;
import com.example.adminpanel.dto.UserDto;
import org.springframework.data.domain.Page;

public interface UserService {

    Page<UserDto> getUsers(String search, int page, int size);

    UserDto updateUser(Long id, UpdateUserRequest request);

    void deleteUser(Long id);
}
