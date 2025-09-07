package com.example.demo.frontend.controller;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import com.example.demo.component.AccessCounter;
import com.example.demo.frontend.model.TemplateForm;

@Controller
public class FormController {
//	"comeco.txt", "sobre.txt", "propostas.txt", "contato.txt", "aatm004p.txt",
 //   "saldo.txt", "extrato.txt"

	private final HttpClient client = HttpClient.newHttpClient();
	private final int COMECO = 0;
	private final int SOBRE = 1;
	private final int PROPOSTAS = 2;
	private final int CONTATO = 3;
	private final int AATM004P = 4;
	private final int SALDO = 5;
	private final int SALDOEN = 6;
	private final int SALDODE = 7;
	private final int EXTRATO = 8;
	@Autowired
	private AccessCounter counter;

	@GetMapping("/")
	public String showForm() {
		counter.increment(COMECO);
		return "comeco";
	}

	@GetMapping("/sobre")
	public String showSobre() {
		counter.increment(SOBRE);
		return "sobre";
	}

	@GetMapping("/propostas")
	public String showPropostas() {
		counter.increment(PROPOSTAS);
		return "propostas";
	}

	@GetMapping("/contato")
	public String showContato() {
		counter.increment(CONTATO);
		return "contato";
	}

	@GetMapping(value = "/zOS", produces = MediaType.TEXT_HTML_VALUE)
	@ResponseBody
	public String showZOS() throws IOException, InterruptedException {
		counter.increment(AATM004P);
		System.out.println("Dentro de z/OS");

		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/AATM004P"))
				.header("Content-Type", "application/x-www-form-urlencoded; charset=ISO-8859-1")
				.build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));
//				HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));


		return response.body();
	}
	@GetMapping(value = "/zOE", produces = MediaType.TEXT_HTML_VALUE)
	@ResponseBody
	public String showZOE() throws IOException, InterruptedException {
		counter.increment(AATM004P);
		System.out.println("Dentro de z/OE");

		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/AATM004I"))
				.header("Content-Type", "application/x-www-form-urlencoded; charset=ISO-8859-1")
				.build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));
//				HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));


		return response.body();
	}
	@GetMapping(value = "/zOA", produces = MediaType.TEXT_HTML_VALUE)
	@ResponseBody
	public String showZOA() throws IOException, InterruptedException {
		counter.increment(AATM004P);
		System.out.println("Dentro de z/OA");

		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/AATM004A"))
				.header("Content-Type", "application/x-www-form-urlencoded; charset=ISO-8859-1")
				.build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));
//				HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));


		return response.body();
	}

	@GetMapping(value = "/SALDO", produces = "text/html; charset=UTF8")
	@ResponseBody
	public String verSaldoGet() throws IOException, InterruptedException  {
		System.out.println("Dentro de SALDO GET");
		counter.increment(SALDO);
//		counter.adicionarVisitante(nome+" - SALDO");
		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/AATMSALD"))
//				.POST(HttpRequest.BodyPublishers.ofString("name=" + nome))
//				.header("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
				.build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));

		return response.body();

	}
	
	@GetMapping(value = "/SALDOEN", produces = "text/html; charset=UTF8")
	@ResponseBody
	public String verSaldoEnGet() throws IOException, InterruptedException  {
		System.out.println("Dentro de SALDOEN GET");
		counter.increment(SALDOEN);
//		counter.adicionarVisitante(nome+" - SALDO");
		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/AATMSAEN"))
//				.POST(HttpRequest.BodyPublishers.ofString("name=" + nome))
//				.header("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
				.build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));

		return response.body();

	}
	@GetMapping(value = "/SALDODE", produces = "text/html; charset=UTF8")
	@ResponseBody
	public String verSaldoDeGet() throws IOException, InterruptedException  {
		System.out.println("Dentro de SALDODE GET");
		counter.increment(SALDO);
//		counter.adicionarVisitante(nome+" - SALDO");
		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/AATMSADE"))
//				.POST(HttpRequest.BodyPublishers.ofString("name=" + nome))
//				.header("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
				.build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));

		return response.body();

	}

	@PostMapping(value = "/SALDO", produces = "text/html; charset=UTF8")
	@ResponseBody
	public String verSaldo(@RequestParam("name") String nome) throws IOException, InterruptedException {
		System.out.println("Dentro de SALDO");
		counter.increment(SALDO);
		counter.adicionarVisitante(nome+" - SALDO");
		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/AATMSALD"))
				.POST(HttpRequest.BodyPublishers.ofString("name=" + nome))
//				.header("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
				.build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));

		return response.body();
	}
	@PostMapping(value = "/SALDOEN", produces = "text/html; charset=UTF8")
	@ResponseBody
	public String verSaldoEn(@RequestParam("name") String nome) throws IOException, InterruptedException {
		System.out.println("Dentro de SALDOEN");

		counter.increment(SALDOEN);
		counter.adicionarVisitante(nome+" - SALDOEN");
		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/AATMSAEN"))
				.POST(HttpRequest.BodyPublishers.ofString("name=" + nome))
//				.header("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
				.timeout(Duration.ofMinutes(2)) // aumenta timeout do cliente
				.build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));

		return response.body();
	}

	@PostMapping(value = "/SALDODE", produces = "text/html; charset=UTF8")
	@ResponseBody
	public String verSaldoDe(@RequestParam("name") String nome) throws IOException, InterruptedException {
		System.out.println("Dentro de SALDODE");

		counter.increment(SALDODE);
		counter.adicionarVisitante(nome+" - SALDODE");
		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/AATMSADE"))
				.POST(HttpRequest.BodyPublishers.ofString("name=" + nome))
//				.header("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
				.build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));

		return response.body();
	}


	@PostMapping(value = "/EXTRATO", produces = MediaType.TEXT_HTML_VALUE)
	@ResponseBody
	public String verExtrato(@RequestParam("name") String nome) throws IOException, InterruptedException {

		counter.increment(EXTRATO);
		counter.adicionarVisitante(nome+" - EXTRATO");
		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/AATMEXTR"))
				.POST(HttpRequest.BodyPublishers.ofString("name=" + nome))
				.header("Content-Type", "application/x-www-form-urlencoded").build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));

		return response.body();
	}
	@GetMapping(value = "/EXTRATO", produces = MediaType.TEXT_HTML_VALUE)
	@ResponseBody
	public String verExtrato() throws IOException, InterruptedException {

		counter.increment(EXTRATO);
//		counter.adicionarVisitante(nome+" - EXTRATO");
		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/AATMEXTR"))
//				.POST(HttpRequest.BodyPublishers.ofString("name=" + nome))
				.header("Content-Type", "application/x-www-form-urlencoded").build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));

		return response.body();
	}

	@PostMapping(value = "/EXTRATODE", produces = MediaType.TEXT_HTML_VALUE)
	@ResponseBody
	public String verExtratoGe(@RequestParam("name") String nome) throws IOException, InterruptedException {

		counter.increment(EXTRATO);
		counter.adicionarVisitante(nome+" - EXTRATODE");
		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/AATMEXGE"))
				.POST(HttpRequest.BodyPublishers.ofString("name=" + nome))
				.header("Content-Type", "application/x-www-form-urlencoded").build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));

		return response.body();
	}
	@GetMapping(value = "/EXTRATODE", produces = MediaType.TEXT_HTML_VALUE)
	@ResponseBody
	public String verExtratoGe() throws IOException, InterruptedException {

		counter.increment(EXTRATO);
//		counter.adicionarVisitante(nome+" - EXTRATODE");
		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/AATMEXGE"))
//				.POST(HttpRequest.BodyPublishers.ofString("name=" + nome))
				.header("Content-Type", "application/x-www-form-urlencoded").build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));

		return response.body();
	}
	@PostMapping(value = "/EXTRATOEN", produces = MediaType.TEXT_HTML_VALUE)
	@ResponseBody
	public String verExtratoEn(@RequestParam("name") String nome) throws IOException, InterruptedException {

		counter.increment(EXTRATO);
		counter.adicionarVisitante(nome+" - EXTRATODE");
		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/AATMEXEN"))
				.POST(HttpRequest.BodyPublishers.ofString("name=" + nome))
				.header("Content-Type", "application/x-www-form-urlencoded").build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));

		return response.body();
	}
	@GetMapping(value = "/EXTRATOEN", produces = MediaType.TEXT_HTML_VALUE)
	@ResponseBody
	public String verExtratoEn() throws IOException, InterruptedException {

		counter.increment(EXTRATO);
//		counter.adicionarVisitante(nome+" - EXTRATODE");
		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/AATMEXEN"))
//				.POST(HttpRequest.BodyPublishers.ofString("name=" + nome))
				.header("Content-Type", "application/x-www-form-urlencoded").build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));

		return response.body();
	}

	@PostMapping("/enviar")
	public String enviarFormulario(@ModelAttribute TemplateForm form, Model model) {
		String url = "http://localhost:8080/template/render";

		Map<String, Object> payload = new HashMap<>();
		payload.put("dataset", form.getDataset());
		payload.put("member", form.getMember());

		Map<String, String> params = new HashMap<>();
		params.put("D02ID", form.getD02ID());
		params.put("D03IP", form.getD03IP());
		params.put("D04PC", form.getD04PC());
		params.put("D05DN", form.getD05DN());
		params.put("D06TP", form.getD06TP());

		payload.put("params", params);

		String auth = Base64.getEncoder().encodeToString((form.getUsuario() + ":" + form.getSenha()).getBytes());

		RestTemplate restTemplate = new RestTemplate();
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.set("Authorization", "Basic " + auth);

		HttpEntity<Map<String, Object>> entity = new HttpEntity<>(payload, headers);

		try {
			ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);

			model.addAttribute("htmlContent", response.getBody());
		} catch (Exception e) {
			model.addAttribute("htmlContent", "Erro ao acessar o host: " + e.getMessage());
		}

		return "resultado";
	}

}
