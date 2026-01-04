import Image from "next/image";

export default function MensagemPresidente() {
  return (
    <section id="mensagem-presidente" className="max-w-6xl mx-auto px-6 py-16">
      
      {/* Título */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">💬</span>
        <h2 className="text-2xl font-semibold text-gray-800">
          Mensagem do Presidente
        </h2>
      </div>

      {/* Linha */}
      <hr className="mb-10 border-gray-300" />

      {/* Conteúdo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        
        {/* Texto */}
        <div className="md:col-span-2 text-gray-700 space-y-4 leading-relaxed">
          <p>
            Bem-vindos à página da Junta de Freguesia de Constance.
          </p>

          <p>
            Esta página foi criada para estar mais perto de todos os cidadãos.
            Aqui pode encontrar informações sobre os nossos serviços,
            atividades e projetos, bem como conhecer a oferta cultural, de
            lazer e comercial da nossa freguesia.
          </p>

          <p>
            Com empenho, trabalho e dedicação, a Junta de Freguesia de
            Constance tem como principal objetivo servir bem a nossa terra e
            todos os Constancenses.
          </p>

          <p>
            Queremos que este espaço seja também um ponto de união entre
            todos, onde possa partilhar as suas sugestões e opiniões para
            continuarmos a melhorar.
          </p>

          <p className="mt-6">
            Um abraço amigo,
          </p>

          <p className="font-semibold md:text-right">
            Joaquim Silva
          </p>
        </div>

        {/* Imagem */}
        <div className="flex justify-center md:justify-end">
          <Image
            src="/presidente.jpg"
            alt="Presidente da Junta de Freguesia"
            width={220}
            height={280}
            className="rounded-md shadow-md object-cover"
          />
        </div>

      </div>
    </section>
  );
}