package com.example.demo.component;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

import java.io.*;
import java.nio.file.*;
import java.util.*;

@Component
public class AccessCounter {

	private static final String[] FILES = { "comeco.txt", "sobre.txt", "propostas.txt", "contato.txt", "aatm004p.txt",
			"saldo.txt", "saldoEn.txt", "saldoDe.txt", "extrato.txt" };
	private static final String FILE_NAME = "visitantes.txt";
	private Set<String> visitantes = new HashSet<>();
	private final List<Integer> accessCounts = new ArrayList<>();

	// Lê os arquivos ao iniciar
	@PostConstruct
	public void loadAccessCounts() {
		accessCounts.clear();
		for (String file : FILES) {
			try {
				Path path = Paths.get(file);
				if (Files.exists(path)) {
					String content = Files.readString(path).trim();
					accessCounts.add(Integer.parseInt(content));
					System.out.println("Arquivo: " + file + "existe");
				} else {
					System.out.println("Arquivo: " + file + "não existe");
					accessCounts.add(0); // se o arquivo não existe, começa com 0
				}

			} catch (Exception e) {
				e.printStackTrace();
				accessCounts.add(0); // fallback em caso de erro
			}
			try {
				Path path = Paths.get(FILE_NAME);
				if (Files.exists(path)) {
					visitantes.addAll(Files.readAllLines(path));
					System.out.println("Visitantes carregados: " + visitantes.size());
				} else {
					System.out.println("Arquivo " + FILE_NAME + " não encontrado. Será criado no shutdown.");
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		System.out.println("Contadores carregados: " + accessCounts);

	}

	@Scheduled(fixedRate = 7200000) // a cada 2 horas (2 * 60 * 60 * 1000 ms)
	public void scheduledSave() {
		saveAll();
		saveVisitantes();
	}

	private void saveVisitantes() {
		try (BufferedWriter writer = Files.newBufferedWriter(Paths.get(FILE_NAME))) {
			for (String v : visitantes) {
				writer.write(v);
				writer.newLine();
			}
			System.out.println("Visitantes salvos em " + FILE_NAME);
		} catch (IOException e) {
			e.printStackTrace();
		}
		System.out.println("Visitantes salvos após 2 horas: ");
	}

	private void saveAll() {
		for (int i = 0; i < FILES.length; i++) {
			try {
				Files.writeString(Paths.get(FILES[i]), String.valueOf(accessCounts.get(i)));
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		System.out.println("Contadores salvos após 2 horas: " + accessCounts);
	}

	// Grava os arquivos ao encerrar
	@PreDestroy
	public void saveAccessCounts() {
		for (int i = 0; i < FILES.length; i++) {
			try {
				Files.writeString(Paths.get(FILES[i]), String.valueOf(accessCounts.get(i)));
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		System.out.println("Contadores salvos: " + accessCounts);
		try (BufferedWriter writer = Files.newBufferedWriter(Paths.get(FILE_NAME))) {
			for (String v : visitantes) {
				writer.write(v);
				writer.newLine();
			}
			System.out.println("Visitantes salvos em " + FILE_NAME);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	// Método de exemplo para incrementar acessos
	public void increment(int index) {
		accessCounts.set(index, accessCounts.get(index) + 1);
	}

	public List<Integer> getAccessCounts() {
		return accessCounts;
	}

	public void adicionarVisitante(String nome) {
		visitantes.add(nome.trim());
	}

	public Set<String> getVisitantes() {
		return Collections.unmodifiableSet(visitantes);
	}
}
