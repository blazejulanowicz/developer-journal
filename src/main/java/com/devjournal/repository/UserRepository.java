package com.devjournal.repository;

import com.devjournal.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


public interface UserRepository extends CrudRepository<User, Long>{

    User findUserByLoginAndPassHash(String login, String passHash);
}
