package com.messaging.mechat.service;

import com.messaging.mechat.collection.users.ChatDetails;
import com.messaging.mechat.collection.users.UserDetails;
import com.messaging.mechat.repository.GroupChatRepository;
import com.messaging.mechat.repository.PrivateChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

@Service
public class ChatService {

    @Autowired
    private GroupChatRepository groupChatRepository;

    @Autowired
    private PrivateChatRepository privateChatRepository;

}
