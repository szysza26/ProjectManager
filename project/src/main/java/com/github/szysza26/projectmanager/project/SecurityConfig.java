package com.github.szysza26.projectmanager.project;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

@Configuration
@EnableMethodSecurity
@EnableWebSecurity
public class SecurityConfig {

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		return http
				.authorizeHttpRequests(auth -> auth.anyRequest ().authenticated ())
				.oauth2ResourceServer(oauth -> oauth
						.jwt(jwt -> jwt.jwtAuthenticationConverter(
								jwtAuthenticationConverter()
						))
				)
				.build ();
	}

	@Bean
	public JwtAuthenticationConverter jwtAuthenticationConverter() {
		JwtGrantedAuthoritiesConverter scopeConverter =
				new JwtGrantedAuthoritiesConverter();

		Converter<Jwt, Collection<GrantedAuthority>> authoritiesConverter =
				jwt -> {
					List<GrantedAuthority> authorities =
							new ArrayList<> (
									scopeConverter.convert(jwt));

					Map<String, Object> realmAccess =
							jwt.getClaimAsMap("realm_access");

					if (realmAccess != null) {
						Object roles = realmAccess.get("roles");

						if (roles instanceof Collection<?> roleNames) {
							roleNames.stream()
									.filter(String.class::isInstance)
									.map(String.class::cast)
									.map(role -> new SimpleGrantedAuthority (
											"ROLE_" + role))
									.forEach(authorities::add);
						}
					}

					return authorities;
				};

		JwtAuthenticationConverter converter =
				new JwtAuthenticationConverter();

		converter.setJwtGrantedAuthoritiesConverter(
				authoritiesConverter);

		return converter;
	}
}
