package com.github.szysza26.projectmanager.gateway;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;

@Configuration
public class SecurityConfig {

	@Bean
	public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {
		return http
				.cors(cors -> cors.disable())
				.csrf(ServerHttpSecurity.CsrfSpec::disable)
				.authorizeExchange(auth -> auth
						.pathMatchers(HttpMethod.OPTIONS, "/**").permitAll()
						.anyExchange().authenticated()
				)
				.oauth2ResourceServer(oauth2 -> oauth2.jwt (Customizer.withDefaults ()))
				.build();
	}
}
