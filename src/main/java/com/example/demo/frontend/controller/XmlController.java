package com.example.demo.frontend.controller;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.view.RedirectView;

@Controller
public class XmlController {
	private final HttpClient client = HttpClient.newHttpClient();
	String cliente = "                                        ";
	String clienteEn = "                                        ";
	String clienteAl = "                                        ";
	@CrossOrigin(origins = "*")
	@PostMapping(value = "/xml", produces = MediaType.TEXT_HTML_VALUE)
	@ResponseBody
	public String showxmlPost(@RequestParam("name") String nome) throws IOException, InterruptedException {
	//	counter.increment(AATM004P);
//		return json.showjson();
		cliente = nome + "                              ";
		System.out.println("Dentro de xml POST BUSCAXML");

		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/BUSCAXML"))
				.POST(HttpRequest.BodyPublishers.ofString("name=" + nome))
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
	@PostMapping(value = "/original/xml", produces = MediaType.TEXT_HTML_VALUE)
	@ResponseBody
	public String showxml(@RequestParam("name") String nome) throws IOException, InterruptedException {
		System.out.println("Dentro de original/xml POST");
		cliente = nome + "                              ";

		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/BUSCAXML"))
				.POST(HttpRequest.BodyPublishers.ofString("name=" + cliente))
				.header("Content-Type", "application/x-www-form-urlencoded; charset=ISO-8859-1").build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));
		String body = response.body();

		return response.body();
	}
	@CrossOrigin(origins = "*")
	@GetMapping(value = "original/xml", produces = MediaType.TEXT_HTML_VALUE)
	@ResponseBody
	public String showxmlORetornaPost() throws IOException, InterruptedException {
	//	counter.increment(AATM004P);
		System.out.println("Dentro de original/xml GET");

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
	@CrossOrigin(origins = "*")
	@PostMapping(value = "original/xmlPT", produces = MediaType.TEXT_XML_VALUE)
	@ResponseBody
	public String showxmlO() throws IOException, InterruptedException {
	//	counter.increment(AATM004P);
		System.out.println("Dentro de original/xml de verdade POST");

		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/xml00001"))
				.POST(HttpRequest.BodyPublishers.ofString("name=" + cliente))
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
	@PostMapping(value = "/xmlPT", produces = MediaType.TEXT_XML_VALUE)
	@ResponseBody
	public String showxml() throws IOException, InterruptedException {
	//	counter.increment(AATM004P);
		System.out.println("Dentro de /xml|PT de verdade POST");

		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/xml00001"))
				.POST(HttpRequest.BodyPublishers.ofString("name=" + cliente))
				
				.header("Content-Type", "application/x-www-form-urlencoded; charset=ISO-8859-1").build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));
//				HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));

//		var resposta = response.body();
		
//		resposta = resposta.replace('Ý', '[') ;
//		resposta = resposta.replace('¨', ']') ;
		String S = response.body().replace('Ý', '[');
		S = S.replace('¨', ']');
		System.out.println(S);
		return S;
	}

	@CrossOrigin(origins = "*")
	@GetMapping("original/xml, produces = MediaType.TEXT_XML_VALUE")
	public String showxmlOGet() throws IOException, InterruptedException {
	//	counter.increment(AATM004P);
		System.out.println("Dentro de original/xml de verdade GET");

		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/xml00001"))
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
	@PostMapping(value = "/original/xmlEN", produces = MediaType.TEXT_HTML_VALUE)
	@ResponseBody
	public String showxmlEN(@RequestParam("name") String nome) throws IOException, InterruptedException {
		System.out.println("Dentro de original/xmlEN html POST");
		clienteEn = nome + "                              ";
		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/BUSCAXME"))
				.POST(HttpRequest.BodyPublishers.ofString("name=" + clienteEn))
				.header("Content-Type", "application/x-www-form-urlencoded; charset=ISO-8859-1").build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));
		String body = response.body();

		return response.body();
	}
	@CrossOrigin(origins = "*")
	@PostMapping(value = "/xmlEN", produces = MediaType.TEXT_HTML_VALUE)
	@ResponseBody
	public String showxmlEn(@RequestParam("name") String nome) throws IOException, InterruptedException {
		System.out.println("Dentro de /xmlEN html POST");
		clienteEn = nome + "                              ";

		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/BUSCAXME"))
				.POST(HttpRequest.BodyPublishers.ofString("name=" + clienteEn))
				.header("Content-Type", "application/x-www-form-urlencoded; charset=ISO-8859-1").build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));
		String body = response.body();

		return response.body();
	}
	@CrossOrigin(origins = "*")
	@GetMapping(value = "original/xmlEN", produces = MediaType.TEXT_HTML_VALUE)
	@ResponseBody
	public String showxmlEnRetornaPost() throws IOException, InterruptedException {
	//	counter.increment(AATM004P);
		System.out.println("Dentro de original/xmlEN html GET");

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
	@PostMapping(value = "original/xmeEN", produces = MediaType.TEXT_XML_VALUE)
	@ResponseBody
	public String showxmlENOPOST() throws IOException, InterruptedException {
	//	counter.increment(AATM004P);
		System.out.println("Dentro de original/xmlEN de verdade ingles POST");

		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/xme00001"))
				.POST(HttpRequest.BodyPublishers.ofString("name=" + clienteEn))
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
	@PostMapping(value = "/xmlENG", produces = MediaType.TEXT_XML_VALUE)
	@ResponseBody
	public String showxmlENPOST() throws IOException, InterruptedException {
	//	counter.increment(AATM004P);
	
		System.out.println("Dentro de /xmlENG de verdade ingles POST");

		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/xme00001"))
				.POST(HttpRequest.BodyPublishers.ofString("name=" + clienteEn))

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
	@GetMapping(value = "original/xmeEN", produces = MediaType.TEXT_XML_VALUE)
	@ResponseBody
	public String showxmlENOGet() throws IOException, InterruptedException {
	//	counter.increment(AATM004P);
		System.out.println("Dentro de original/xmlEN de verdade ingles GET");

		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/xme00001"))
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
	@PostMapping(value = "/original/xmlDE", produces = MediaType.TEXT_HTML_VALUE)
	@ResponseBody
	public String showxmlDE(@RequestParam("name") String nome) throws IOException, InterruptedException {
		System.out.println("Dentro de original/xmlDE html POST");
		clienteAl = nome + "                              ";
		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/BUSCAXMA"))
				.POST(HttpRequest.BodyPublishers.ofString("name=" + clienteAl))
				.header("Content-Type", "application/x-www-form-urlencoded; charset=ISO-8859-1").build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));
		String body = response.body();

		return response.body();
	}
	@CrossOrigin(origins = "*")
	@PostMapping(value = "/xmlDE", produces = MediaType.TEXT_HTML_VALUE)
	@ResponseBody
	public String showxmlAl(@RequestParam("name") String nome) throws IOException, InterruptedException {
		clienteAl = nome + "                              ";
		System.out.println("Dentro de original/xmlDE html POST");
			HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/BUSCAXMA"))
				.POST(HttpRequest.BodyPublishers.ofString("name=" + clienteAl))
				.header("Content-Type", "application/x-www-form-urlencoded; charset=ISO-8859-1").build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));
		String body = response.body();

		return response.body();
	}
	@CrossOrigin(origins = "*")
	@GetMapping(value = "/xmlDE", produces = MediaType.TEXT_HTML_VALUE)
	@ResponseBody
	public String showxmlAlGet() throws IOException, InterruptedException {
	//	cliente = nome + "                              ";
		System.out.println("Dentro de original/xmlDE html GET com pau");
			HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/BUSCAXMA"))
				.POST(HttpRequest.BodyPublishers.ofString("name=" + clienteAl))
				.header("Content-Type", "application/x-www-form-urlencoded; charset=ISO-8859-1").build();

		HttpResponse<String> response = client.send(req,
				HttpResponse.BodyHandlers.ofString(StandardCharsets.ISO_8859_1));
		String body = response.body();

		return response.body();
	}


	@CrossOrigin(origins = "*")
	@GetMapping(value = "original/xmlDE", produces = MediaType.TEXT_HTML_VALUE)
	@ResponseBody
	public String showxmlDERetornaPost() throws IOException, InterruptedException {
	//	counter.increment(AATM004P);
		System.out.println("Dentro de original/xmlDE html GET");

		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/BUSCAXMA"))
				.POST(HttpRequest.BodyPublishers.ofString("name=" + clienteAl))
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
	@GetMapping(value = "original/xmaDE", produces = MediaType.TEXT_XML_VALUE)
	@ResponseBody
	public String showxmlDEOGet() throws IOException, InterruptedException {
	//	counter.increment(AATM004P);
		System.out.println("Dentro de original/xmlDE xml GET");

		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/xma00001"))
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
	@PostMapping(value = "original/xmaDE", produces = MediaType.TEXT_XML_VALUE)
	@ResponseBody
	public String showxmlDEOPost() throws IOException, InterruptedException {
	//	counter.increment(AATM004P);

		System.out.println("Dentro de original/xmlDE xml POST");

		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/xma00001"))
				.POST(HttpRequest.BodyPublishers.ofString("name=" + clienteAl))
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
	@PostMapping(value = "/xmlGER", produces = MediaType.TEXT_XML_VALUE)
	@ResponseBody
	public String showxmlDEPost() throws IOException, InterruptedException {
	//	counter.increment(AATM004P);
		System.out.println("Dentro de /xmlGER xml POST");
		HttpRequest req = HttpRequest.newBuilder().uri(URI.create("http://192.168.0.13:3000/CICS/CWBA/xma00001"))
				.POST(HttpRequest.BodyPublishers.ofString("name=" + clienteAl))

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

}
