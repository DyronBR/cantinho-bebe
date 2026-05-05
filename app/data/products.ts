export interface Product {
    id: number;
    name: string;
    description: string;
    fullDescription: string;
    image: string;
    category: string;  // ← MUDOU AQUI
    specifications: Record<string, string>;
}

    const products: Product[] = [
    {
        id: 1,
        name: "Bodie Azul",
        price: 29.90,
        category: "Roupas",
        image: "/images/hero-premium.png?auto=compress&cs=tinysrgb&w=400",
        description: "Bodie azul super macio em algodão orgânico puro, sem químicos. Perfeito para recém-nascidos de 0-12 meses, garante conforto delicado e proteção carinhosa o dia todo."
    },
    {
        id: 2,
        name: "Toalha de Boca",
        price: 49.90,
        category: "Toalhas",
        image: "/images/hero-premium.png?auto=compress&cs=tinysrgb&w=400",
        description: "Toalha de boca absorvente e fofinha em algodão 100% natural para bebês de 0-6 meses. Limpa com carinho as boquinhas dos pequeninos, priorizando segurança e maciez."
    },
    {
        id: 3,
        name: "Babador Impermeável",
        price: 12.90,
        category: "Acessórios",
        image: "/images/hero-premium.png?auto=compress&cs=tinysrgb&w=400",
        description: "Babador impermeável super protetor para roupinhas de bebês de 0-6 meses. Material seguro, macio e sem químicos, fácil de limpar para mais conforto e menos preocupação!"
    },
    {
        id: 4,
        name: "Laço de Cabelo",
        price: 15.99,
        category: "Acessórios",
        image: "/images/hero-premium.png?auto=compress&cs=tinysrgb&w=400",
        description: "Laço delicado e leve para princesinhas recém-nascidas de 0-3 meses. Feito em tecido macio sem elásticos agressivos, puro carinho e charme seguro para a cabecinha sensível."
    },
    {
        id: 5,
        name: "Toalha de Banho",
        price: 24.90,
        category: "Toalhas",
        image: "/images/hero-premium.png?auto=compress&cs=tinysrgb&w=400",
        description: "Toalha de banho grande e ultra macia em algodão orgânico para bebês de 0-12 meses. Envolvente e protetora, aquece o corpinho delicado após o banho com total segurança."
    },
    {
        id: 6,
        name: "Toalha com Capuz",
        price: 39.90,
        category: "Toalhas",
        image: "/images/hero-premium.png?auto=compress&cs=tinysrgb&w=400",
        description: "Toalha com capuz quentinha e fofinha para recém-nascidos de 0-6 meses. Algodão puro sem químicos aquece e protege com carinho, ideal para pós-banho seguro e aconchego."
    },
    {
        id: 7,
        name: "Sapatinho Feminino",
        price: 35.00,
        category: "Sapatinhos",
        image: "/images/hero-premium.png?auto=compress&cs=tinysrgb&w=400",
        description: "Sapatinho bootie feminino sem solado, delicado e macio para pezinhos de 0-6 meses. Mantém quentinho com algodão seguro, conforto total sem risco de escorregar."
    },
    {
        id: 8,
        name: "Sapatinho Masculino",
        price: 22.50,
        category: "Sapatinhos",
        image: "/images/hero-premium.png?auto=compress&cs=tinysrgb&w=400",
        description: "Sapatinho bootie masculino sem solado, super suave para bem pequenininhos de 0-6 meses. Algodão orgânico protege os pezinhos com carinho e segurança absoluta."
    }
];

export default products;