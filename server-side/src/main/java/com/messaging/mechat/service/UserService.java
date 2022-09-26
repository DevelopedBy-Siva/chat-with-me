package com.messaging.mechat.service;

import com.messaging.mechat.collection.users.UserData;
import com.messaging.mechat.exception.ErrorCode;
import com.messaging.mechat.exception.MeChatException;
import com.messaging.mechat.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
public class UserService implements UserServiceImpl, UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        try {
            UserData user = userRepository.findByEmail(email);
            if (Objects.isNull(user)) {
                log.error("No user found with mail id: {}", email);
                throw new MeChatException(ErrorCode.USR_NOT_FOUND, ErrorCode.USR_NOT_FOUND.message, HttpStatus.NOT_FOUND);
            }
            Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
            UserDetails userDetails = new User(user.getEmail(), user.getPassword(), authorities);
            return userDetails;
        } catch (Exception ex) {
            log.error("Unknow error occured. Failed to login: {}", ex.getMessage());
            throw new MeChatException(ErrorCode.UNKNOWN_ERROR, ErrorCode.UNKNOWN_ERROR.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
