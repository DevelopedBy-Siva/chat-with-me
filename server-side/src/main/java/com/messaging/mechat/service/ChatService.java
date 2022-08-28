package com.messaging.mechat.service;

import com.messaging.mechat.repository.GroupChatRepository;
import com.messaging.mechat.repository.PrivateChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatService {

    @Autowired
    private GroupChatRepository groupChatRepository;

    @Autowired
    private PrivateChatRepository privateChatRepository;

}
