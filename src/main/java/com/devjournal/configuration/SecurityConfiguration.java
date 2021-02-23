package com.devjournal.configuration;

import com.devjournal.model.User;
import com.devjournal.service.SpringDataJpaUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.data.repository.query.SecurityEvaluationContextExtension;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    private SpringDataJpaUserDetailsService userDetailsService;

    @Autowired
    public SecurityConfiguration(SpringDataJpaUserDetailsService userDetailsService) {
        super();

        this.userDetailsService = userDetailsService;
    }


    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .userDetailsService(this.userDetailsService)
                .passwordEncoder(User.PASSWORD_ENCODER);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                    .antMatchers("/built/**/main.css").permitAll()
                    .anyRequest().authenticated()
                    .and()
                .formLogin()
                    .defaultSuccessUrl("/", true)
                    .permitAll()
                    .and()
                .httpBasic()
                    .and()
                .csrf().disable()
                .logout()
                    .logoutSuccessUrl("/");
    }

    @Bean
    public SecurityEvaluationContextExtension securityEvaluationContextExtension() {
        return new SecurityEvaluationContextExtension();
    }
}
