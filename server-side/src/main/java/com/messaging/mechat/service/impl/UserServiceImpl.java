package com.messaging.mechat.service.impl;

import com.messaging.mechat.collection.users.UserData;
import com.messaging.mechat.exception.ErrorCode;
import com.messaging.mechat.repository.UserRepository;
import com.messaging.mechat.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Objects;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserServiceImpl implements UserService, UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        UserData user = userRepository.findByEmail(email);
        if (Objects.isNull(user)) {
            log.error("No user found with mail id: {}", email);
            throw new UsernameNotFoundException(ErrorCode.ERR_USR_NOT_FOUND.toString());
        }
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        UserDetails userDetails = new User(user.getEmail(), user.getPassword(), authorities);
        return userDetails;
    }
}
