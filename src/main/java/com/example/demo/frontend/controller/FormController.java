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
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.view.RedirectView;

import com.example.demo.component.AccessCounter;
import com.example.demo.frontend.model.TemplateForm;

@Controller
public class FormController {
//	"comeco.txt", "sobre.txt", "propostas.txt", "contato.txt", "aatm004p.txt",
	// "saldo.txt", "extrato.txt"

	private final HttpClient client = HttpClient.newHttpClient();
	@Autowired
	private JsonController json;
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
	
    @GetMapping("/demo")
    @CrossOrigin(origins = "*")
    public String redirectToDemo() {
        return "redirect:http://maramajo.ddns.net:32000/";
    }

	@GetMapping("/original")
	@CrossOrigin(origins = "*")
	public String showForm() {
		counter.increment(COMECO);
		return "spaMesmaAba3";
	}

	@GetMapping("/")
	@CrossOrigin(origins = "*")
	public String soZOS(HttpServletResponse servletResp) throws Exception {
		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/AATM004P"))
				.header("Content-Type", "application/x-www-form-urlencoded; charset=ISO-8859-1").header("passo", "1")
				.GET().build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));

		// 1) Pegar os headers do mainframe
		Map<String, List<String>> zosHeaders = response.headers().map();

		// 2) Passar para a view (ex.: Thymeleaf) para exibir no HTML
		// model.addAttribute("zosHeaders", zosHeaders);
		// model.addAttribute("zosBody", response.body());
		// model.addAttribute("zosStatus", response.statusCode());

		// 3) Copiar os headers para a resposta HTTP enviada ao browser,
		// exceto headers "hop-by-hop" que não devem ser propagados
		Set<String> skip = Set.of("content-length", "transfer-encoding", "connection", "keep-alive",
				"proxy-authenticate", "proxy-authorization", "te", "trailer", "upgrade");

		for (Map.Entry<String, List<String>> e : zosHeaders.entrySet()) {
			String name = e.getKey();
			if (skip.contains(name.toLowerCase()))
				continue;
			for (String value : e.getValue()) {
				// use addHeader para permitir múltiplos valores
				servletResp.addHeader(name, value);
				System.out.println("SOZOS COMEÇO : " + name + "  " + value);
			}
		}

		// Opcional: definir status do servlet response igual ao do ZOS (cuidado com
		// páginas)
		// servletResp.setStatus(response.statusCode());

		return "spaChamazOS"; // sua view/template
	}

	@GetMapping("/sobre")
	@CrossOrigin(origins = "*")
	public String showSobre() {
		counter.increment(SOBRE);
		return "sobre";
	}

	@GetMapping("/original/sobre")
	@CrossOrigin(origins = "*")
	public String showSobr1() {
		counter.increment(SOBRE);
		System.out.println("Em original/sobre");
		return "sobreOriginal";
	}

	@GetMapping("/propostas")
	@CrossOrigin(origins = "*")
	public String showPropostas() {
		counter.increment(PROPOSTAS);
		System.out.println("Em /propostas");
		return "propostas";
	}

	@GetMapping("/original/propostas")
	@CrossOrigin(origins = "*")
	public String showProposta1() {
		counter.increment(PROPOSTAS);
		System.out.println("Em /original/propostas");
		return "propostasOriginal";
	}

	@GetMapping("/contato")
	@CrossOrigin(origins = "*")
	public String showContato() {
		counter.increment(CONTATO);
		return "contato";
	}

	@GetMapping("/original/contato")
	@CrossOrigin(origins = "*")
	public String showContat1() {
		counter.increment(CONTATO);
		System.out.println("Em original/contato");
		return "contatoOriginal";
	}

	@CrossOrigin(origins = "*")
	@GetMapping(value = "/zOS", produces = MediaType.TEXT_HTML_VALUE)
	@ResponseBody
	public String showZOS() throws IOException, InterruptedException {
		counter.increment(AATM004P);
		System.out.println("Dentro de z/OS");

		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/AATM004P"))
				.header("Content-Type", "application/x-www-form-urlencoded; charset=ISO-8859-1").build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));
//				HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));

		return response.body();
	}
	@CrossOrigin(origins = "*")
	@GetMapping(value = "/json", produces = MediaType.TEXT_HTML_VALUE)
	@ResponseBody
	public String showjson() throws IOException, InterruptedException {
	//	counter.increment(AATM004P);
//		return json.showjson();
		System.out.println("Dentro de json BUSCAJSO");

		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/BUSCAJSO"))
				.header("Content-Type", "application/x-www-form-urlencoded; charset=ISO-8859-1").build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));
//				HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));

//		var resposta = response.body();
		
//		resposta = resposta.replace('Ý', '[') ;
//		resposta = resposta.replace('¨', ']') ;
		String S = response.body().replace('Ý', '[');
		S = S.replace('¨', ']');
		return response.body();
	}
//	@CrossOrigin(origins = "*")
//	@PostMapping(value = "/json", produces = MediaType.TEXT_HTML_VALUE)
//	@ResponseBody
//	public String showjsonPost() throws IOException, InterruptedException {
//	//	counter.increment(AATM004P);
////		return json.showjson();
//		System.out.println("Dentro de json BUSCAJSO");
//
//		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/BUSCAJSO"))
//				.header("Content-Type", "application/x-www-form-urlencoded; charset=ISO-8859-1").build();
//
//		HttpResponse<String> response = client.send(req,
//				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));
////				HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
//
////		var resposta = response.body();
//		
////		resposta = resposta.replace('Ý', '[') ;
////		resposta = resposta.replace('¨', ']') ;
//		String S = response.body().replace('Ý', '[');
//		S = S.replace('¨', ']');
//		return response.body();
//	}
	@CrossOrigin(origins = "*")
	@GetMapping(value = "/xml", produces = MediaType.TEXT_HTML_VALUE)
	@ResponseBody
	public String showxml() throws IOException, InterruptedException {
	//	counter.increment(AATM004P);
//		return json.showjson();
		System.out.println("Dentro de xml POST BUSCAXML");

		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/BUSCAXML"))
				.header("Content-Type", "application/x-www-form-urlencoded; charset=ISO-8859-1").build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));
//				HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));

//		var resposta = response.body();
		
//		resposta = resposta.replace('Ý', '[') ;
//		resposta = resposta.replace('¨', ']') ;
		String S = response.body().replace('Ý', '[');
		S = S.replace('¨', ']');
		return response.body();
	}
//	@CrossOrigin(origins = "*")
//	@PostMapping(value = "/xml", produces = MediaType.TEXT_HTML_VALUE)
//	@ResponseBody
//	public String showxmlPost() throws IOException, InterruptedException {
//	//	counter.increment(AATM004P);
////		return json.showjson();
//		System.out.println("Dentro de xml POST BUSCAXML");
//
//		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/BUSCAXML"))
//				.header("Content-Type", "application/x-www-form-urlencoded; charset=ISO-8859-1").build();
//
//		HttpResponse<String> response = client.send(req,
//				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));
////				HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
//
////		var resposta = response.body();
//		
////		resposta = resposta.replace('Ý', '[') ;
////		resposta = resposta.replace('¨', ']') ;
//		String S = response.body().replace('Ý', '[');
//		S = S.replace('¨', ']');
//		return response.body();
//	}
	@CrossOrigin(origins = "*")
	@GetMapping(value = "/xmlEN", produces = MediaType.TEXT_HTML_VALUE)
	@ResponseBody
	public String showxmlEN() throws IOException, InterruptedException {
	//	counter.increment(AATM004P);
//		return json.showjson();
		System.out.println("Dentro de xmlEN GET BUSCAXME");

		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/BUSCAXME"))
				.header("Content-Type", "application/x-www-form-urlencoded; charset=ISO-8859-1").build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));
//				HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));

//		var resposta = response.body();
		
//		resposta = resposta.replace('Ý', '[') ;
//		resposta = resposta.replace('¨', ']') ;
		String S = response.body().replace('Ý', '[');
		S = S.replace('¨', ']');
		return response.body();
	}




	@CrossOrigin(origins = "*")
	@GetMapping(value = "/jsonEN", produces = MediaType.TEXT_HTML_VALUE)
	@ResponseBody
	public String showjsonEN() throws IOException, InterruptedException {
	//	counter.increment(AATM004P);
//		return json.showjson();
		System.out.println("Dentro de jsonEN BUSCAJSi");

		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/BUSCAJSI"))
				.header("Content-Type", "application/x-www-form-urlencoded; charset=ISO-8859-1").build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));
//				HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));

//		var resposta = response.body();
		
//		resposta = resposta.replace('Ý', '[') ;
//		resposta = resposta.replace('¨', ']') ;
		String S = response.body().replace('Ý', '[');
		S = S.replace('¨', ']');
		return response.body();
	}
//	@CrossOrigin(origins = "*")
//	@PostMapping(value = "/jsonEN", produces = MediaType.TEXT_HTML_VALUE)
//	@ResponseBody
//	public String showjsonENPost() throws IOException, InterruptedException {
//	//	counter.increment(AATM004P);
////		return json.showjson();
//		System.out.println("Dentro de jsonEN BUSCAJSI");
//
//		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/BUSCAJSI"))
//				.header("Content-Type", "application/x-www-form-urlencoded; charset=ISO-8859-1").build();
//
//		HttpResponse<String> response = client.send(req,
//				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));
////				HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
//
////		var resposta = response.body();
//		
////		resposta = resposta.replace('Ý', '[') ;
////		resposta = resposta.replace('¨', ']') ;
//		String S = response.body().replace('Ý', '[');
//		S = S.replace('¨', ']');
//		return response.body();
//	}
	@CrossOrigin(origins = "*")
	@GetMapping(value = "/jsonDE", produces = MediaType.TEXT_HTML_VALUE)
	@ResponseBody
	public String showjsonDE() throws IOException, InterruptedException {
	//	counter.increment(AATM004P);
//		return json.showjson();
		System.out.println("Dentro de jsonDE BUSCAJSA");

		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/BUSCAJSA"))
				.header("Content-Type", "application/x-www-form-urlencoded; charset=ISO-8859-1").build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));
//				HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));

//		var resposta = response.body();
		
//		resposta = resposta.replace('Ý', '[') ;
//		resposta = resposta.replace('¨', ']') ;
		String S = response.body().replace('Ý', '[');
		S = S.replace('¨', ']');
		return response.body();
	}
//	@CrossOrigin(origins = "*")
//	@PostMapping(value = "/jsonDE", produces = MediaType.TEXT_HTML_VALUE)
//	@ResponseBody
//	public String showjsonDEPost() throws IOException, InterruptedException {
//	//	counter.increment(AATM004P);
////		return json.showjson();
//		System.out.println("Dentro de jsonDE BUSCAJSA");
//
//		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/BUSCAJSA"))
//				.header("Content-Type", "application/x-www-form-urlencoded; charset=ISO-8859-1").build();
//
//		HttpResponse<String> response = client.send(req,
//				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));
////				HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
//
////		var resposta = response.body();
//		
////		resposta = resposta.replace('Ý', '[') ;
////		resposta = resposta.replace('¨', ']') ;
//		String S = response.body().replace('Ý', '[');
//		S = S.replace('¨', ']');
//		return response.body();
//	}


	@CrossOrigin(origins = "*")
	@GetMapping(value = "/jsonDE", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public String showjsonDEJson() throws IOException, InterruptedException {
	//	counter.increment(AATM004P);
		System.out.println("Dentro de json");

		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/JSON000A"))
				.header("Content-Type", "application/x-www-form-urlencoded; charset=ISO-8859-1").build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));
//				HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));

//		var resposta = response.body();
		
//		resposta = resposta.replace('Ý', '[') ;
//		resposta = resposta.replace('¨', ']') ;
		String S = response.body().replace('Ý', '[');
		S = S.replace('¨', ']');
		return S;
	}
	@CrossOrigin(origins = "*")
	@GetMapping(value = "/original/zOS", produces = MediaType.TEXT_HTML_VALUE)
	@ResponseBody
	public String showZO1() throws IOException, InterruptedException {
		counter.increment(AATM004P);
		System.out.println("Dentro de original z/OS");

		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/AATM004P"))
				.header("Content-Type", "application/x-www-form-urlencoded; charset=ISO-8859-1").build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));
//				HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));

		return response.body();
	}

	@GetMapping(value = "/original/zOE", produces = MediaType.TEXT_HTML_VALUE)
	@CrossOrigin(origins = "*")
	@ResponseBody
	public String showZO2() throws IOException, InterruptedException {
		counter.increment(AATM004P);
		System.out.println("Dentro de original z/OE");

		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/AATM004I"))
				.header("Content-Type", "application/x-www-form-urlencoded; charset=ISO-8859-1").build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));
//				HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));

		return response.body();
	}

	@GetMapping(value = "/zOE", produces = MediaType.TEXT_HTML_VALUE)
	@CrossOrigin(origins = "*")
	@ResponseBody
	public String showZOE() throws IOException, InterruptedException {
		counter.increment(AATM004P);
		System.out.println("Dentro de original z/OE");

		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/AATM004I"))
				.header("Content-Type", "application/x-www-form-urlencoded; charset=ISO-8859-1").build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));
//				HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));

		return response.body();
	}

	@GetMapping(value = "/zOA", produces = MediaType.TEXT_HTML_VALUE)
	@CrossOrigin(origins = "*")
	@ResponseBody
	public String showZOA() throws IOException, InterruptedException {
		counter.increment(AATM004P);
		System.out.println("Dentro de original z/OA");

		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/AATM004A"))
				.header("Content-Type", "application/x-www-form-urlencoded; charset=ISO-8859-1").build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));
//				HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));

		return response.body();
	}

	@GetMapping(value = "/original/zOA", produces = MediaType.TEXT_HTML_VALUE)
	@CrossOrigin(origins = "*")
	@ResponseBody
	public String showZO3() throws IOException, InterruptedException {
		counter.increment(AATM004P);
		System.out.println("Dentro de original z/OA");

		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/AATM004A"))
				.header("Content-Type", "application/x-www-form-urlencoded; charset=ISO-8859-1").build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));
//				HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));

		return response.body();
	}

	@GetMapping(value = "/SALDO", produces = "text/html; charset=UTF8")
	@CrossOrigin(origins = "*")
	@ResponseBody
	public String verSaldoGet() throws IOException, InterruptedException {
		System.out.println("Dentro de SALDO GET");
		counter.increment(SALDO);
		counter.adicionarVisitante(" - SALDO");
		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/AATMSALD"))
//				.POST(HttpRequest.BodyPublishers.ofString("name=" + nome))
//				.header("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
				.build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));

		return response.body();

	}

	@GetMapping(value = "/original/SALDO", produces = "text/html; charset=UTF8")
	@CrossOrigin(origins = "*")
	@ResponseBody
	public String verSaldoGe1() throws IOException, InterruptedException {
		System.out.println("Dentro de original SALDO GET");
		counter.increment(SALDO);
		counter.adicionarVisitante(" - SALDO");
		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/AATMSALD"))
//				.POST(HttpRequest.BodyPublishers.ofString("name=" + nome))
//				.header("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
				.build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));

		return response.body();

	}

	@GetMapping(value = "/SALDOEN", produces = "text/html; charset=UTF8")
	@CrossOrigin(origins = "*")
	@ResponseBody
	public String verSaldoEnGet() throws IOException, InterruptedException {
		System.out.println("Dentro de SALDOEN GET");
		counter.increment(SALDOEN);
		counter.adicionarVisitante(" - SALDO");
		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/AATMSAEN"))
//				.POST(HttpRequest.BodyPublishers.ofString("name=" + nome))
//				.header("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
				.build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));

		return response.body();

	}

	@GetMapping(value = "/original/SALDOEN", produces = "text/html; charset=UTF8")
	@CrossOrigin(origins = "*")
	@ResponseBody
	public String verSaldoEnGe1() throws IOException, InterruptedException {
		System.out.println("Dentro de original SALDOEN GET");
		counter.increment(SALDOEN);
		counter.adicionarVisitante(" - SALDO");
		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/AATMSAEN"))
//				.POST(HttpRequest.BodyPublishers.ofString("name=" + nome))
//				.header("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
				.build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));

		return response.body();

	}

	@GetMapping(value = "/SALDODE", produces = "text/html; charset=UTF8")
	@CrossOrigin(origins = "*")
	@ResponseBody
	public String verSaldoDeGet() throws IOException, InterruptedException {
		System.out.println("Dentro de SALDODE GET");
		counter.increment(SALDO);
		counter.adicionarVisitante(" - SALDO");
		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/AATMSADE"))
//				.POST(HttpRequest.BodyPublishers.ofString("name=" + nome))
//				.header("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
				.build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));

		return response.body();

	}

	@GetMapping(value = "/original/SALDODE", produces = "text/html; charset=UTF8")
	@CrossOrigin(origins = "*")
	@ResponseBody
	public String verSaldoDeGe1() throws IOException, InterruptedException {
		System.out.println("Dentro de original SALDODE GET");
		counter.increment(SALDO);
		counter.adicionarVisitante(" - SALDO");
		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/AATMSADE"))
//				.POST(HttpRequest.BodyPublishers.ofString("name=" + nome))
//				.header("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
				.build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));

		return response.body();

	}

	@PostMapping(value = "/SALDO", produces = "text/html; charset=UTF8")
	@CrossOrigin(origins = "*")
	@ResponseBody
	public String verSaldo(@RequestParam("name") String nome) throws IOException, InterruptedException {
		System.out.println("Dentro de SALDO");
		counter.increment(SALDO);
		counter.adicionarVisitante(nome + " - SALDO");
		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/AATMSALD"))
				.POST(HttpRequest.BodyPublishers.ofString("name=" + nome))
//				.header("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
				.build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));

		return response.body();
	}

	@PostMapping(value = "/original/SALDO", produces = "text/html; charset=UTF8")
	@CrossOrigin(origins = "*")
	@ResponseBody
	public String verSald1(@RequestParam("name") String nome) throws IOException, InterruptedException {
		System.out.println("Dentro de original SALDO");
		counter.increment(SALDO);
		counter.adicionarVisitante(nome + " - SALDO");
		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/AATMSALD"))
				.POST(HttpRequest.BodyPublishers.ofString("name=" + nome))
//				.header("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
				.build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));

		return response.body();
	}

	@PostMapping(value = "/SALDOEN", produces = "text/html; charset=UTF8")
	@CrossOrigin(origins = "*")
	@ResponseBody
	public String verSaldoEn(@RequestParam("name") String nome) throws IOException, InterruptedException {
		System.out.println("Dentro de SALDOEN");

		counter.increment(SALDOEN);
		counter.adicionarVisitante(nome + " - SALDOEN");
		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/AATMSAEN"))
				.POST(HttpRequest.BodyPublishers.ofString("name=" + nome))
//				.header("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
				.timeout(Duration.ofMinutes(2)) // aumenta timeout do cliente
				.build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));

		return response.body();
	}

	@PostMapping(value = "/original/SALDOEN", produces = "text/html; charset=UTF8")
	@CrossOrigin(origins = "*")
	@ResponseBody
	public String verSaldoE1(@RequestParam("name") String nome) throws IOException, InterruptedException {
		System.out.println("Dentro de original SALDOEN");

		counter.increment(SALDOEN);
		counter.adicionarVisitante(nome + " - SALDOEN");
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
	@CrossOrigin(origins = "*")
	@ResponseBody
	public String verSaldoDe(@RequestParam("name") String nome) throws IOException, InterruptedException {
		System.out.println("Dentro de SALDODE");

		counter.increment(SALDODE);
		counter.adicionarVisitante(nome + " - SALDODE");
		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/AATMSADE"))
				.POST(HttpRequest.BodyPublishers.ofString("name=" + nome))
//				.header("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
				.build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));

		return response.body();
	}

	@PostMapping(value = "original/SALDODE", produces = "text/html; charset=UTF8")
	@CrossOrigin(origins = "*")
	@ResponseBody
	public String verSaldoD1(@RequestParam("name") String nome) throws IOException, InterruptedException {
		System.out.println("Dentro de original SALDODE");

		counter.increment(SALDODE);
		counter.adicionarVisitante(nome + " - SALDODE");
		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/AATMSADE"))
				.POST(HttpRequest.BodyPublishers.ofString("name=" + nome))
//				.header("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
				.build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));

		return response.body();
	}

	@PostMapping(value = "/EXTRATO", produces = MediaType.TEXT_HTML_VALUE)
	@CrossOrigin(origins = "*")
	@ResponseBody
	public String verExtrato(@RequestParam("name") String nome) throws IOException, InterruptedException {

		counter.increment(EXTRATO);
		counter.adicionarVisitante(nome + " - EXTRATO");
		System.out.println("Dentro de EXTRATO");

		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/AATMEXTR"))
				.POST(HttpRequest.BodyPublishers.ofString("name=" + nome))
				.header("Content-Type", "application/x-www-form-urlencoded").build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));
	//	System.out.println("CORPO - " + response.body());

		return response.body();
	}
	@PostMapping(value = "/original/EXTRATO", produces = MediaType.TEXT_HTML_VALUE)
	@CrossOrigin(origins = "*")
	@ResponseBody
	public String verExtrat1(@RequestParam("name") String nome) throws IOException, InterruptedException {

		counter.increment(EXTRATO);
		counter.adicionarVisitante(nome + " - EXTRATO");
		System.out.println("Dentro de original EXTRATO");

		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/AATMEXTR"))
				.POST(HttpRequest.BodyPublishers.ofString("name=" + nome))
				.header("Content-Type", "application/x-www-form-urlencoded").build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));
	//	System.out.println("CORPO - " + response.body());

		return response.body();
	}


	@GetMapping(value = "/EXTRATO", produces = MediaType.TEXT_HTML_VALUE)
	@CrossOrigin(origins = "*")
	@ResponseBody
	public String verExtrato() throws IOException, InterruptedException {
		System.out.println("Dentro de EXTRATO");
		counter.increment(EXTRATO);
		counter.adicionarVisitante(" - EXTRATO");
		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/AATMEXTR"))
//				.POST(HttpRequest.BodyPublishers.ofString("name=" + nome))
				.header("Content-Type", "application/x-www-form-urlencoded").build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));
//		System.out.println("CORPO - " + response.body());
		return response.body();
	}

	@GetMapping(value = "original/EXTRATO", produces = MediaType.TEXT_HTML_VALUE)
	@CrossOrigin(origins = "*")
	@ResponseBody
	public String verExtrat1() throws IOException, InterruptedException {

		counter.increment(EXTRATO);
		counter.adicionarVisitante(" - EXTRATO");
		System.out.println("Dentro de original EXTRATO");
		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/AATMEXTR"))
//				.POST(HttpRequest.BodyPublishers.ofString("name=" + nome))
				.header("Content-Type", "application/x-www-form-urlencoded").build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));

		return response.body();
	}

	@PostMapping(value = "/EXTRATODE", produces = MediaType.TEXT_HTML_VALUE)
	@CrossOrigin(origins = "*")
	@ResponseBody
	public String verExtratoGe(@RequestParam("name") String nome) throws IOException, InterruptedException {

		counter.increment(EXTRATO);
		counter.adicionarVisitante(nome + " - EXTRATODE");
		System.out.println("Dentro de original EXTRATODE");
		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/AATMEXGE"))
				.POST(HttpRequest.BodyPublishers.ofString("name=" + nome))
				.header("Content-Type", "application/x-www-form-urlencoded").build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));

		return response.body();
	}

	@PostMapping(value = "/original/EXTRATODE", produces = MediaType.TEXT_HTML_VALUE)
	@CrossOrigin(origins = "*")
	@ResponseBody
	public String verExtratoG1(@RequestParam("name") String nome) throws IOException, InterruptedException {

		counter.increment(EXTRATO);
		counter.adicionarVisitante(nome + " - EXTRATODE");
		System.out.println("Dentro de original EXTRATODE");
		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/AATMEXGE"))
				.POST(HttpRequest.BodyPublishers.ofString("name=" + nome))
				.header("Content-Type", "application/x-www-form-urlencoded").build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));

		return response.body();
	}

	@GetMapping(value = "/EXTRATODE", produces = MediaType.TEXT_HTML_VALUE)
	@CrossOrigin(origins = "*")
	@ResponseBody
	public String verExtratoGe() throws IOException, InterruptedException {

		counter.increment(EXTRATO);
		System.out.println("Dentro de EXTRATODE");
		counter.adicionarVisitante(" - EXTRATODE");
		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/AATMEXGE"))
//				.POST(HttpRequest.BodyPublishers.ofString("name=" + nome))
				.header("Content-Type", "application/x-www-form-urlencoded").build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));

		return response.body();
	}

	@GetMapping(value = "original/EXTRATODE", produces = MediaType.TEXT_HTML_VALUE)
	@CrossOrigin(origins = "*")
	@ResponseBody
	public String verExtratoG1() throws IOException, InterruptedException {

		counter.increment(EXTRATO);
		counter.adicionarVisitante(" - EXTRATODE");
		System.out.println("Dentro de original EXTRATODE");
		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/AATMEXGE"))
//				.POST(HttpRequest.BodyPublishers.ofString("name=" + nome))
				.header("Content-Type", "application/x-www-form-urlencoded").build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));

		return response.body();
	}

	@PostMapping(value = "/EXTRATOEN", produces = MediaType.TEXT_HTML_VALUE)
	@CrossOrigin(origins = "*")
	@ResponseBody
	public String verExtratoEn(@RequestParam("name") String nome) throws IOException, InterruptedException {

		counter.increment(EXTRATO);
		counter.adicionarVisitante(nome + " - EXTRATODE");
		System.out.println("Dentro de EXTRATOEN");
		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/AATMEXEN"))
				.POST(HttpRequest.BodyPublishers.ofString("name=" + nome))
				.header("Content-Type", "application/x-www-form-urlencoded").build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));

		return response.body();
	}

	@PostMapping(value = "/original/EXTRATOEN", produces = MediaType.TEXT_HTML_VALUE)
	@CrossOrigin(origins = "*")
	@ResponseBody
	public String verExtratoE1(@RequestParam("name") String nome) throws IOException, InterruptedException {

		counter.increment(EXTRATO);
		counter.adicionarVisitante(nome + " - EXTRATOEN");
		System.out.println("Dentro de original EXTRATOEN");
		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/AATMEXEN"))
				.POST(HttpRequest.BodyPublishers.ofString("name=" + nome))
				.header("Content-Type", "application/x-www-form-urlencoded").build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));

		return response.body();
	}

	@GetMapping(value = "/EXTRATOEN", produces = MediaType.TEXT_HTML_VALUE)
	@CrossOrigin(origins = "*")
	@ResponseBody
	public String verExtratoEn() throws IOException, InterruptedException {

		counter.increment(EXTRATO);
		counter.adicionarVisitante(" - EXTRATODE");
		System.out.println("Dentro de EXTRATOEN");
		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/AATMEXEN"))
//				.POST(HttpRequest.BodyPublishers.ofString("name=" + nome))
				.header("Content-Type", "application/x-www-form-urlencoded").build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));

		return response.body();
	}

	@GetMapping(value = "/original/EXTRATOEN", produces = MediaType.TEXT_HTML_VALUE)
	@CrossOrigin(origins = "*")
	@ResponseBody
	public String verExtratoE1() throws IOException, InterruptedException {

		counter.increment(EXTRATO);
		System.out.println("Dentro de original EXTRATOEN get");
		counter.adicionarVisitante(" - EXTRATODE");
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
