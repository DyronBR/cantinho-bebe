export interface Product {
    id: number;
    name: string;
    description: string;
    fullDescription: string;
    image: string;
    category: string;
    specifications: Record<string, string>;
}

const products: Product[] = [
    {
        id: 1,
        name: "Bodie Azul",
        category: "Roupas",
        image: "/images/hero-premium.png?auto=compress&cs=tinysrgb&w=400",
        description: "Bodie azul super macio em algodão orgânico puro, sem químicos. Perfeito para recém-nascidos de 0-12 meses, garante conforto delicado e proteção carinhosa o dia todo.",
        fullDescription: "Nosso Bodie Azul é confeccionado em algodão orgânico 100% puro, livre de corantes e substâncias químicas. Desenvolvido especialmente para a pele sensível de recém-nascidos de 0 a 12 meses, oferece maciez incomparável e liberdade de movimento. O fechamento por botões de pressão facilita a troca e as aberturas nas costas permitem uma veste tranquila. Ideal para o dia a dia, passeios e momentos de sono.",
        specifications: {
            "Material": "Algodão Orgânico 100%",
            "Idade": "0-12 meses",
            "Cores": "Azul",
            "Lavagem": "Água morna, sabão neutro, não usar alvejante"
        }
    },
    {
        id: 2,
        name: "Toalha de Boca",
        category: "Toalhas",
        image: "/images/hero-premium.png?auto=compress&cs=tinysrgb&w=400",
        description: "Toalha de boca absorvente e fofinha em algodão 100% natural para bebês de 0-6 meses. Limpa com carinho as boquinhas dos pequeninos, priorizando segurança e maciez.",
        fullDescription: "A Toalha de Boca do Cantinho do Bebê é feita em algodão 100% natural de alta absorção. Com tamanho ideal para limpar suavemente a boquinha e o queixo do seu bebê durante a amamentação ou alimentação, ela não irrita a pele delicada dos pequeninos. Lavável e durável, mantém a maciez mesmo após várias lavagens. Disponível em kit para maior praticidade no dia a dia.",
        specifications: {
            "Material": "Algodão Natural 100%",
            "Idade": "0-6 meses",
            "Dimensões": "30 x 30 cm",
            "Lavagem": "Água morna, sabão neutro, secar ao ar livre"
        }
    },
    {
        id: 3,
        name: "Babador Impermeável",
        category: "Acessórios",
        image: "/images/hero-premium.png?auto=compress&cs=tinysrgb&w=400",
        description: "Babador impermeável super protetor para roupinhas de bebês de 0-6 meses. Material seguro, macio e sem químicos, fácil de limpar para mais conforto e menos preocupação!",
        fullDescription: "O Babador Impermeável foi desenvolvido para proteger as roupinhas do bebê durante as refeições e momentos de amamentação. Sua camada impermeável interna impede que líquidos atravessem para a roupa, enquanto o lado externo em algodão macio protege a pele do pescocinho delicado. O fechamento ajustável garante encaixe seguro em diferentes tamanhos. Fácil de limpar — basta passar um pano úmido ou lavar em água morna.",
        specifications: {
            "Material": "Algodão externo + impermeável interno",
            "Idade": "0-6 meses",
            "Fechamento": "Velcro ajustável",
            "Lavagem": "Água morna, sabão neutro, não torcer"
        }
    },
    {
        id: 4,
        name: "Laço de Cabelo",
        category: "Acessórios",
        image: "/images/hero-premium.png?auto=compress&cs=tinysrgb&w=400",
        description: "Laço delicado e leve para princesinhas recém-nascidas de 0-3 meses. Feito em tecido macio sem elásticos agressivos, puro carinho e charme seguro para a cabecinha sensível.",
        fullDescription: "O Laço de Cabelo foi criado pensando na segurança e no conforto das bebezinhas recém-nascidas. Confeccionado em tecido de musselina macio, não aperta nem deixa marcas na cabecinha sensível. A faixa elástica é suave e não provoca pressão ou desconforto. Perfeito para fotos e ocasiões especiais, combina charme e cuidado em cada detalhe. Disponível em diversas cores e estampas.",
        specifications: {
            "Material": "Musselina de algodão",
            "Idade": "0-3 meses",
            "Cores": "Diversas opções",
            "Lavagem": "À mão em água fria, secar ao ar livre"
        }
    },
    {
        id: 5,
        name: "Toalha de Banho",
        category: "Toalhas",
        image: "/images/hero-premium.png?auto=compress&cs=tinysrgb&w=400",
        description: "Toalha de banho grande e ultra macia em algodão orgânico para bebês de 0-12 meses. Envolvente e protetora, aquece o corpinho delicado após o banho com total segurança.",
        fullDescription: "A Toalha de Banho do Cantinho do Bebê é extra macia e envolvente, ideal para acolher o bebê logo após o banho. Seu tamanho generoso permite embrulhar o corpinho inteiro com facilidade. Produzida em algodão orgânico de alta gramatura, é altamente absorvente e mantém o bebê aquecido sem risco de alergia. Bordas bem acabadas garantem durabilidade e as lavagens frequentes não alteram a maciez do tecido.",
        specifications: {
            "Material": "Algodão Orgânico 100%",
            "Idade": "0-12 meses",
            "Dimensões": "70 x 90 cm",
            "Lavagem": "Água morna, sabão neutro, não usar amaciante"
        }
    },
    {
        id: 6,
        name: "Toalha com Capuz",
        category: "Toalhas",
        image: "/images/hero-premium.png?auto=compress&cs=tinysrgb&w=400",
        description: "Toalha com capuz quentinha e fofinha para recém-nascidos de 0-6 meses. Algodão puro sem químicos aquece e protege com carinho, ideal para pós-banho seguro e aconchego.",
        fullDescription: "A Toalha com Capuz é um clássico que combina praticidade e carinho. O capuzinho cobre a cabecinha do bebê logo após o banho, evitando a perda de calor corporal e tornando o momento pós-banho muito mais seguro e aconchegante. Fabricada em algodão puro sem aditivos químicos, é suave ao toque e hipoalergênica. Seu design fofo com orelhinhas torna cada banho ainda mais especial e divertido.",
        specifications: {
            "Material": "Algodão 100%",
            "Idade": "0-6 meses",
            "Dimensões": "75 x 75 cm",
            "Lavagem": "Água morna, sabão neutro, secar ao ar livre"
        }
    },
    {
        id: 7,
        name: "Sapatinho Feminino",
        category: "Sapatinhos",
        image: "/images/hero-premium.png?auto=compress&cs=tinysrgb&w=400",
        description: "Sapatinho bootie feminino sem solado, delicado e macio para pezinhos de 0-6 meses. Mantém quentinho com algodão seguro, conforto total sem risco de escorregar.",
        fullDescription: "O Sapatinho Feminino é um bootie sem solado desenvolvido especialmente para manter os pezinhos das bebezinhas quentinhos e confortáveis. Sem solado rígido, respeita o desenvolvimento natural dos pés e não restringe os movimentos. Confeccionado em algodão macio e seguro, é ideal para uso dentro de casa e passeios. O elástico suave na boca garante que o sapatinho fique no lugar sem apertar. Disponível em tons rosados e estampas delicadas.",
        specifications: {
            "Material": "Algodão macio 100%",
            "Idade": "0-6 meses",
            "Solado": "Sem solado (bootie)",
            "Lavagem": "À mão em água fria, secar ao ar livre"
        }
    },
    {
        id: 8,
        name: "Sapatinho Masculino",
        category: "Sapatinhos",
        image: "/images/hero-premium.png?auto=compress&cs=tinysrgb&w=400",
        description: "Sapatinho bootie masculino sem solado, super suave para bem pequenininhos de 0-6 meses. Algodão orgânico protege os pezinhos com carinho e segurança absoluta.",
        fullDescription: "O Sapatinho Masculino é um bootie sem solado perfeito para os pezinhos dos bebezinhos. Sem estrutura rígida, permite o desenvolvimento livre e natural dos pés enquanto os mantém aquecidos e protegidos. Produzido em algodão orgânico certificado, é hipoalergênico e seguro para a pele mais sensível. O acabamento caprichado e o elástico suave garantem conforto durante todo o dia. Disponível em tons azuis, cinzas e estampas neutras.",
        specifications: {
            "Material": "Algodão Orgânico 100%",
            "Idade": "0-6 meses",
            "Solado": "Sem solado (bootie)",
            "Lavagem": "À mão em água fria, secar ao ar livre"
        }
    }
];

export default products;
