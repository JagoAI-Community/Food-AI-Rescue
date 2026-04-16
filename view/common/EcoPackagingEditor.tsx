
import React, { useState, useMemo } from 'react';
import { ArrowLeft, Sparkles, Package, Loader2, Copy, Check, Download, Zap, Plus, CheckCircle2, Search, LayoutGrid, List, Image as ImageIcon } from 'lucide-react';
import { Button } from '../components/Button';
import { db } from '../../services/db';
import { packagingDesign } from '../../services/packagingDesign';
import { UserData, FoodItem } from '../../types';

interface EcoPackagingEditorProps {
    currentUser: UserData | null;
    foodItems: FoodItem[];
    onBack: () => void;
}

export const EcoPackagingEditor: React.FC<EcoPackagingEditorProps> = ({ currentUser, foodItems, onBack }) => {
    const [selectedFoodId, setSelectedFoodId] = useState<string>(foodItems[0]?.id || '');
    const [customFoodName, setCustomFoodName] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const [visualUrl, setVisualUrl] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    
    // New Features: Styles & Materials
    const [selectedStyle, setSelectedStyle] = useState('Modern Minimalist');
    const [materialConstraint, setMaterialConstraint] = useState('');

    const [imageLoading, setImageLoading] = useState(false);
    const [imageError, setImageError] = useState(false);

    const artStyles = [
        { name: 'Modern Minimalist', icon: '✨' },
        { name: 'Rustic Kraft', icon: '📦' },
        { name: 'Eco-Vintage', icon: '🌿' },
        { name: 'Futuristic Bio', icon: '🧪' },
        { name: 'Artisan Pastel', icon: '🎨' }
    ];

    const filteredItems = useMemo(() => {
        return foodItems.filter(item => 
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [foodItems, searchTerm]);

    const handleGenerate = async () => {
        const foodName = foodItems.find(f => f.id === selectedFoodId)?.name || customFoodName;
        if (!foodName) return alert("Pilih menu atau masukkan nama makanan.");

        setIsGenerating(true);
        setVisualUrl(null);
        setImageError(false);
        try {
            // Enhanced prompt logic for text concept if needed, but keeping service call simple
            const content = await packagingDesign.generate(
                `${foodName} with ${selectedStyle} style${materialConstraint ? ` using ${materialConstraint}` : ''}`, 
                currentUser?.role || 'corporate_donor'
            );
            setResult(content);
        } catch (e: any) {
            alert(e.message);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleGenerateVisual = () => {
        if (!result) return;
        const foodName = foodItems.find(f => f.id === selectedFoodId)?.name || customFoodName;
        
        // Build an advanced prompt based on new inputs
        const stylePrompt = `in ${selectedStyle} style, ${materialConstraint ? `${materialConstraint} material emphasis, ` : ''}`;
        const shortPrompt = `High-end eco-friendly sustainable food packaging for ${foodName}, ${stylePrompt}biodegradable materials, studio product photography, clean professional background, premium quality textures, cinematic lighting, 8k, realistic mockup`;
        
        const encodedPrompt = encodeURIComponent(shortPrompt);
        const seed = Math.floor(Math.random() * 9999);
        const url = `https://pollinations.ai/p/${encodedPrompt}?width=1024&height=1024&seed=${seed}&nologo=true`;
        
        setImageLoading(true);
        setImageError(false);
        setVisualUrl(url);
    };

    const handleSaveDesain = async () => {
        if (!currentUser?.id || !result || !visualUrl) return;
        
        setIsSaving(true);
        try {
            await db.saveCorporateAIResult({
                donorId: currentUser.id,
                foodId: selectedFoodId ? Number(selectedFoodId) : 0,
                type: 'PACKAGING',
                title: `Eco Design: ${foodItems.find(f => f.id === selectedFoodId)?.name || customFoodName}`,
                content: JSON.stringify({
                    concept: result,
                    imageUrl: visualUrl,
                    style: selectedStyle,
                    material: materialConstraint
                })
            });
            alert("Desain berhasil disimpan ke riwayat Anda!");
        } catch (e: any) {
            alert(e.message);
        } finally {
            setIsSaving(false);
        }
    };

    const copyToClipboard = () => {
        if (!result) return;
        navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 z-[100] bg-white dark:bg-stone-950 flex flex-col md:max-w-6xl md:mx-auto md:relative md:h-[95vh] md:rounded-[3rem] md:shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-500">
            {/* Header */}
            <header className="p-6 flex items-center justify-between bg-white/80 dark:bg-stone-950/80 backdrop-blur-md sticky top-0 z-10 border-b border-stone-100 dark:border-stone-900">
                <button 
                    onClick={onBack}
                    className="p-3 bg-stone-100 dark:bg-stone-900 rounded-2xl text-stone-600 dark:text-stone-300 active:scale-90 transition-all"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="text-center flex-1">
                    <h2 className="text-xl font-black text-stone-900 dark:text-white leading-none tracking-tight uppercase italic flex items-center justify-center gap-2">
                        <Package className="w-5 h-5 text-indigo-500" /> Eco Packaging
                    </h2>
                    <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] mt-1">AI Design Assistant</p>
                </div>
                <div className="w-11"></div>
            </header>

            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 custom-scrollbar pb-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: Selection (5/12) */}
                    <div className="lg:col-span-5 space-y-8">
                        {/* 1. Pilih Produk */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-[10px] font-black text-stone-900 dark:text-white uppercase tracking-[0.2em]">01. Pilih Produk</h3>
                                <div className="flex bg-stone-100 dark:bg-stone-900 p-1 rounded-xl border border-stone-200/50 dark:border-stone-800">
                                    <button 
                                        onClick={() => setViewMode('grid')}
                                        className={`p-1.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-stone-800 shadow-sm text-indigo-600' : 'text-stone-400'}`}
                                    >
                                        <LayoutGrid className="w-4 h-4" />
                                    </button>
                                    <button 
                                        onClick={() => setViewMode('list')}
                                        className={`p-1.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white dark:bg-stone-800 shadow-sm text-indigo-600' : 'text-stone-400'}`}
                                    >
                                        <List className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                                <input 
                                    type="text"
                                    placeholder="Cari Menu..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-800 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 focus:outline-none text-sm font-bold transition-all"
                                />
                            </div>

                            <div className={`grid gap-3 ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-1'}`}>
                                {filteredItems.map(f => (
                                    <button 
                                        key={f.id}
                                        onClick={() => {
                                            setSelectedFoodId(f.id);
                                            setCustomFoodName('');
                                        }}
                                        className={`relative rounded-[2rem] border-2 overflow-hidden transition-all group ${viewMode === 'grid' ? 'aspect-square' : 'p-3 flex gap-4 items-center'} ${selectedFoodId === f.id ? 'border-indigo-600 shadow-lg shadow-indigo-500/10' : 'border-stone-100 dark:border-stone-800 hover:border-indigo-200 dark:hover:border-indigo-800'}`}
                                    >
                                        <div className={`${viewMode === 'grid' ? 'absolute inset-0' : 'w-14 h-14 rounded-2xl'} overflow-hidden`}>
                                            <img src={f.imageUrl} alt={f.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        </div>
                                        {viewMode === 'grid' && <div className="absolute inset-0 bg-stone-900/20 group-hover:bg-stone-900/10 transition-colors" />}
                                        
                                        <div className={`${viewMode === 'grid' ? 'absolute inset-x-0 bottom-0 p-3 bg-white/40 dark:bg-black/40 backdrop-blur-md border-t border-white/20 dark:border-white/5' : 'flex-1 text-left'}`}>
                                            <p className={`text-[10px] font-black uppercase line-clamp-2 leading-tight ${viewMode === 'grid' ? 'text-stone-900 dark:text-white' : 'text-stone-900 dark:text-white'}`}>{f.name}</p>
                                        </div>
                                        
                                        {selectedFoodId === f.id && (
                                            <div className={`${viewMode === 'grid' ? 'absolute top-3 right-3' : 'ml-auto'} bg-indigo-600 p-1 rounded-lg shadow-lg`}>
                                                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 2. Style Selection */}
                        <div className="space-y-4">
                            <h3 className="text-[10px] font-black text-stone-900 dark:text-white uppercase tracking-[0.2em]">02. Tema Visual</h3>
                            <div className="flex flex-wrap gap-2">
                                {artStyles.map(style => (
                                    <button
                                        key={style.name}
                                        onClick={() => setSelectedStyle(style.name)}
                                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border-2 ${selectedStyle === style.name ? 'bg-stone-900 dark:bg-white text-white dark:text-stone-900 border-stone-900 dark:border-white shadow-lg' : 'bg-white dark:bg-stone-900 text-stone-500 border-stone-100 dark:border-stone-800 hover:border-indigo-200'}`}
                                    >
                                        <span className="text-sm">{style.icon}</span>
                                        {style.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 3. Material Constraint */}
                        <div className="space-y-4">
                            <h3 className="text-[10px] font-black text-stone-900 dark:text-white uppercase tracking-[0.2em]">03. Batasan Material</h3>
                            <input 
                                type="text"
                                placeholder="Cth: Daun Pisang, Pelepah Pinang, High-grade Cardboard..."
                                value={materialConstraint}
                                onChange={(e) => setMaterialConstraint(e.target.value)}
                                className="w-full p-4 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-800 focus:border-indigo-500 focus:outline-none text-[11px] font-bold"
                            />
                        </div>

                        <Button 
                            onClick={handleGenerate}
                            disabled={isGenerating}
                            className="w-full h-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_100%] hover:bg-right transition-all duration-500 rounded-2xl text-white font-black uppercase tracking-[0.2em] shadow-xl shadow-indigo-500/20 active:scale-95"
                        >
                            {isGenerating ? <Loader2 className="w-6 h-6 animate-spin" /> : <><Sparkles className="w-5 h-5 mr-3" /> Generate Konsep</>}
                        </Button>
                    </div>

                    {/* Right Column: Output (7/12) */}
                    <div className="lg:col-span-7 space-y-6">
                        {!result ? (
                            <div className="h-full min-h-[600px] border-2 border-dashed border-stone-100 dark:border-stone-800 rounded-[3rem] flex flex-col items-center justify-center text-center p-12 space-y-6 bg-stone-50/30 dark:bg-stone-900/10">
                                <div className="w-24 h-24 bg-white dark:bg-stone-900 rounded-[3rem] shadow-xl border border-stone-100 dark:border-stone-800 flex items-center justify-center relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <Package className="w-10 h-10 text-stone-200 group-hover:text-indigo-500 group-hover:scale-110 transition-all duration-500" />
                                </div>
                                <div className="max-w-xs space-y-3">
                                    <h4 className="text-sm font-black text-stone-900 dark:text-white uppercase tracking-tight italic">Design Your Eco-Legacy</h4>
                                    <p className="text-[11px] text-stone-400 font-medium leading-relaxed">
                                        Pilih produk dan tema visual di samping. AI kami akan merancang konsep kemasan inovatif untuk Anda.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6 animate-in zoom-in-95 duration-700">
                                {/* Result Text Card: GLASSMORPHISM */}
                                <div className="bg-stone-950 rounded-[3rem] p-8 md:p-10 text-white shadow-2xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-8">
                                        <Sparkles className="w-16 h-16 text-indigo-500/20 group-hover:scale-125 group-hover:rotate-12 transition-all duration-1000" />
                                    </div>
                                    <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-600/20 rounded-full blur-[80px]" />
                                    
                                    <div className="relative z-10 space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                                                    <Zap className="w-4 h-4 text-indigo-400" />
                                                </div>
                                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400">Concept Blueprint</h4>
                                            </div>
                                            <div className="flex gap-2">
                                                <button onClick={copyToClipboard} className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-white/60 hover:text-white transition-all">
                                                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="prose prose-invert max-w-none pr-2">
                                            <p className="text-stone-300 leading-8 font-medium whitespace-pre-wrap text-sm">{result}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Visual Mockup Area */}
                                <div className="bg-white dark:bg-stone-900 border-2 border-stone-100 dark:border-stone-800 rounded-[3rem] p-8 space-y-6 shadow-sm">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400">Visual Simulation</h4>
                                            {visualUrl && <p className="text-[9px] font-bold text-indigo-500 uppercase">Style: {selectedStyle}</p>}
                                        </div>
                                        <div className="flex gap-2">
                                            <Button 
                                                onClick={handleGenerateVisual}
                                                disabled={imageLoading}
                                                variant="outline"
                                                className="bg-indigo-50/50 dark:bg-indigo-900/10 border-indigo-100 dark:border-indigo-900/20 text-indigo-600 rounded-xl text-[9px] font-black uppercase py-2.5 px-6 shadow-none hover:bg-indigo-100 active:scale-95"
                                            >
                                                {imageLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><ImageIcon className="w-4 h-4 mr-2" /> {visualUrl ? 'Regenerate' : 'Render Visual'}</>}
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="relative aspect-square rounded-[2rem] overflow-hidden border border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-black/40 group">
                                        {visualUrl && (
                                            <>
                                                <img 
                                                    src={visualUrl} 
                                                    alt="Packaging Mockup" 
                                                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${imageLoading ? 'opacity-0 scale-110 blur-xl' : 'opacity-100 scale-100 blur-0'}`}
                                                    onLoad={() => setImageLoading(false)}
                                                    onError={() => { setImageLoading(false); setImageError(true); }}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </>
                                        )}
                                        
                                        {imageLoading && (
                                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10 backdrop-blur-sm bg-white/10">
                                                <div className="w-16 h-16 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin" />
                                                <div className="text-center">
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500">Mentransformasi Ide...</p>
                                                    <p className="text-[8px] text-stone-400 uppercase mt-1">Estimasi 5-10 detik</p>
                                                </div>
                                            </div>
                                        )}

                                        {imageError && !imageLoading && (
                                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10">
                                                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
                                                    <ImageIcon className="w-8 h-8 text-red-300" />
                                                </div>
                                                <p className="text-[10px] font-bold text-red-500">Koneksi terganggu. Gagal memuat simulasi.</p>
                                                <button onClick={handleGenerateVisual} className="text-[9px] font-black uppercase bg-stone-900 text-white px-6 py-2.5 rounded-xl">
                                                    Coba Ulangi
                                                </button>
                                            </div>
                                        )}

                                        {!visualUrl && !imageLoading && (
                                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-stone-300 px-12 text-center">
                                                <div className="w-16 h-16 bg-white dark:bg-stone-900 rounded-[2rem] shadow-sm flex items-center justify-center">
                                                    <ImageIcon className="w-8 h-8 opacity-20" />
                                                </div>
                                                <p className="text-[10px] font-bold leading-relaxed">Klik "Render Visual" untuk melihat visualisasi kemasan ramah lingkungan Anda.</p>
                                            </div>
                                        )}
                                    </div>

                                    {visualUrl && !imageLoading && !imageError && (
                                        <div className="flex gap-4">
                                            <button 
                                                onClick={handleSaveDesain}
                                                disabled={isSaving}
                                                className="flex-1 py-4 bg-stone-900 dark:bg-white text-white dark:text-stone-900 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
                                            >
                                                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <><CheckCircle2 className="w-4 h-4" /> Simpan Konsep</>}
                                            </button>
                                            <a 
                                                href={visualUrl} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-indigo-500/20 hover:bg-indigo-700 active:scale-95 transition-all flex items-center justify-center gap-2"
                                            >
                                                <Download className="w-4 h-4" /> Download Design
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
