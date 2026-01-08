package com.example.demo.frontend.controller;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
@Controller
public class CartaoController {
	private final HttpClient client = HttpClient.newHttpClient();
	@PostMapping(value = "/cartao", produces = "text/html; charset=UTF8")
	@CrossOrigin(origins = "*")
	@ResponseBody
	public String verCartao(@RequestParam("name") String nome) throws IOException, InterruptedException {
		System.out.println("Dentro de cartao");
//		counter.increment(SALDO);
//		counter.adicionarVisitante(nome + " - SALDO");
		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/KMP1101P"))
				.POST(HttpRequest.BodyPublishers.ofString("name=" + nome))
//				.header("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
				.build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));

		return response.body();
	}
	@PostMapping(value = "/original/cartao", produces = "text/html; charset=UTF8")
	@CrossOrigin(origins = "*")
	@ResponseBody
	public String verCartaoOri(@RequestParam("name") String nome) throws IOException, InterruptedException {
		System.out.println("Dentro de Original cartao");
//		counter.increment(SALDO);
//		counter.adicionarVisitante(nome + " - SALDO");
		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/KMP1101P"))
				.POST(HttpRequest.BodyPublishers.ofString("name=" + nome))
//				.header("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
				.build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));

		return response.body();
	}
	@GetMapping(value = "/original/cartao", produces = "text/html; charset=UTF8")
	@CrossOrigin(origins = "*")
	@ResponseBody
	public String verCartaoGetOri() throws IOException, InterruptedException {
		System.out.println("Dentro de Original cartao GET");
//		counter.increment(SALDO);
//		counter.adicionarVisitante(" - SALDO");
		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/KMP1101P"))
//				.POST(HttpRequest.BodyPublishers.ofString("name=" + nome))
//				.header("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
				.build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));

		return response.body();

	}


	@PostMapping(value = "/ai01", produces = "text/html; charset=UTF8")
	@CrossOrigin(origins = "*")
	@ResponseBody
	public String verCartaoAI01(@RequestParam("M01NACT") String nome) throws IOException, InterruptedException {
		System.out.println("Dentro de AI01");
//		counter.increment(SALDO);
//		counter.adicionarVisitante(nome + " - SALDO");
		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/KMP0101P"))
				.POST(HttpRequest.BodyPublishers.ofString("name=" + nome))
//				.header("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
				.build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));

		return response.body();
	}
	@GetMapping(value = "/ai01")
	@CrossOrigin(origins = "*")
//	@ResponseBody
	public String verCartaoAI01Get() throws IOException, InterruptedException {
		System.out.println("Dentro de GET AI01");
		return "redirect:http://maramajo.ddns.net:32000/";
	}
	@PostMapping(value = "/ae01", produces = "text/html; charset=UTF8")
	@CrossOrigin(origins = "*")
	@ResponseBody
	public String verCartaoAE01(@RequestParam("M01NACT") String nome) throws IOException, InterruptedException {
		System.out.println("Dentro de AE01");
//		counter.increment(SALDO);
//		counter.adicionarVisitante(nome + " - SALDO");
		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/KMP0101E"))
				.POST(HttpRequest.BodyPublishers.ofString("name=" + nome))
//				.header("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
				.build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));

		return response.body();
	}
	@GetMapping(value = "/ae01")
	@CrossOrigin(origins = "*")
//	@ResponseBody
	public String verCartaoAE01Get() throws IOException, InterruptedException {
		System.out.println("Dentro de GET AE01");
		return "redirect:http://maramajo.ddns.net:32000/";
	}
	@PostMapping(value = "/aa01", produces = "text/html; charset=UTF8")
	@CrossOrigin(origins = "*")
	@ResponseBody
	public String verCartaoAA01(@RequestParam("M01NACT") String nome) throws IOException, InterruptedException {
		System.out.println("Dentro de AA01");
//		counter.increment(SALDO);
//		counter.adicionarVisitante(nome + " - SALDO");
		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/KMP0101A"))
				.POST(HttpRequest.BodyPublishers.ofString("name=" + nome))
//				.header("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
				.build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));

		return response.body();
	}
	@GetMapping(value = "/aa01")
	@CrossOrigin(origins = "*")
//	@ResponseBody
	public String verCartaoAA01Get() throws IOException, InterruptedException {
		System.out.println("Dentro de GET AA01");
		return "redirect:http://maramajo.ddns.net:32000/";
	}


	@PostMapping(value = "/original/ai01", produces = "text/html; charset=UTF8")
	@CrossOrigin(origins = "*")
	@ResponseBody
	public String verCartaoAI01Ori(@RequestParam("M01NACT") String nome) throws IOException, InterruptedException {
		System.out.println("Dentro de Original AI01");
//		counter.increment(SALDO);
//		counter.adicionarVisitante(nome + " - SALDO");
		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/KMP0101P"))
				.POST(HttpRequest.BodyPublishers.ofString("name=" + nome))
//				.header("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
				.build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));

		return response.body();
	}
	@GetMapping(value = "/original/ai01", produces = "text/html; charset=UTF8")
	@CrossOrigin(origins = "*")
	@ResponseBody
	public String verCartaoAI01OriGet() throws IOException, InterruptedException {
		System.out.println("Dentro de Original AI01");
//		counter.increment(SALDO);
//		counter.adicionarVisitante(nome + " - SALDO");
		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/KMP0101P"))
//				.POST(HttpRequest.BodyPublishers.ofString("name=" + nome))
//				.header("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
				.build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));

		return response.body();
	}


	@GetMapping(value = "/cartao")
	@CrossOrigin(origins = "*")
//	@ResponseBody
	public String verCartaoGet() throws IOException, InterruptedException {
		System.out.println("Dentro de cartao GET");

		return "redirect:http://maramajo.ddns.net:32000/";

	}
	//=============
	@PostMapping(value = "/cartaoEN", produces = "text/html; charset=UTF8")
	@CrossOrigin(origins = "*")
	@ResponseBody
	public String verCartaoEN(@RequestParam("name") String nome) throws IOException, InterruptedException {
		System.out.println("Dentro de cartaoEN");
//		counter.increment(SALDO);
//		counter.adicionarVisitante(nome + " - SALDO");
		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/KMP1101E"))
				.POST(HttpRequest.BodyPublishers.ofString("name=" + nome))
//				.header("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
				.build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));

		return response.body();
	}
	@GetMapping(value = "/cartaoEN")
	@CrossOrigin(origins = "*")
//	@ResponseBody
	public String verCartaoENGet() throws IOException, InterruptedException {
		System.out.println("Dentro de cartaoEN GET");
		return "redirect:http://maramajo.ddns.net:32000/";

	}
	//=============
	@PostMapping(value = "/cartaoDE", produces = "text/html; charset=UTF8")
	@CrossOrigin(origins = "*")
	@ResponseBody
	public String verCartaoDE(@RequestParam("name") String nome) throws IOException, InterruptedException {
		System.out.println("Dentro de cartaoDE");
//		counter.increment(SALDO);
//		counter.adicionarVisitante(nome + " - SALDO");
		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/KMP1101A"))
				.POST(HttpRequest.BodyPublishers.ofString("name=" + nome))
//				.header("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
				.build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));

		return response.body();
	}
	@GetMapping(value = "/cartaoDE", produces = "text/html; charset=UTF8")
	@CrossOrigin(origins = "*")
	@ResponseBody
	public String verCartaoDEGet() throws IOException, InterruptedException {
		System.out.println("Dentro de cartaoDE GET");
//		counter.increment(SALDO);
//		counter.adicionarVisitante(" - SALDO");
		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/KMP1101A"))
//				.POST(HttpRequest.BodyPublishers.ofString("name=" + nome))
//				.header("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
				.build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));

		return response.body();

	}




}
