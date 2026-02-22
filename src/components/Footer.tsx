import { siteConfig } from "@/lib/config";

export default function Footer() {
    return (
        <footer className="w-full border-t border-white/10 bg-black/30 mt-auto">
            <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm text-gray-500">
                    © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
                </p>
                <div className="flex gap-6">
                    <a href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
                        利用規約
                    </a>
                    <a href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
                        プライバシーポリシー
                    </a>
                    <a href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
                        特定商取引法に基づく表記
                    </a>
                </div>
            </div>
        </footer>
    );
}
