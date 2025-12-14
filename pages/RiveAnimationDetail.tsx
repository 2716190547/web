
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Pause } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas';
import { BackgroundShapes } from '../components/BackgroundShapes';
import { useLanguage } from '../contexts/LanguageContext';
import { useSound } from '../contexts/SoundContext';

const RiveAnimationDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { language } = useLanguage();
    const { playClick, playSwipeIn, playSwipeOut } = useSound();
    const [isPlaying, setIsPlaying] = useState(true);

    const isZh = language === 'zh';

    // Animation data
    const animationsData: Record<string, any> = {
        'western-wasteland': {
            src: '/web/assets/西部废土.riv',
            title: '西部废土',
            description: isZh
                ? '荒凉的西部废土场景，末世风格氛围。'
                : 'Desolate western wasteland scene with post-apocalyptic atmosphere.',
            coverImage: './image/动效/西部废土.png',
            aspectRatio: 'aspect-[16/9]'
        },
        'stars': {
            src: '/web/assets/星星.riv',
            title: '星星',
            description: isZh
                ? '点击星星，或许会有不一样的变化！'
                : 'Click the stars, maybe something different will happen!',
            coverImage: './image/动效/星星.png',
            aspectRatio: 'aspect-square'
        },
        'firework': {
            src: '/web/assets/花火.riv',
            title: '花火',
            description: isZh
                ? '绚丽的烟花动画，营造节日氛围。'
                : 'Gorgeous firework animation with festive atmosphere.',
            coverImage: './image/动效/花火.png',
            aspectRatio: 'aspect-square'
        },
        'text-swing': {
            src: '/web/assets/文字摆动.riv',
            title: '文字摆动',
            description: isZh
                ? '文字动态摆动效果，增添页面趣味性。'
                : 'Dynamic text swinging effect adds fun to pages.',
            coverImage: './image/动效/文字摆动.png',
            aspectRatio: 'aspect-square'
        },
        'monster': {
            src: '/web/assets/小怪物.riv',
            title: '小怪物',
            description: isZh
                ? '可爱的小怪物角色，丰富的表情和动作。'
                : 'Cute monster character with rich expressions and motions.',
            coverImage: './image/动效/小怪物.png',
            aspectRatio: 'aspect-square'
        }
    };

    const animation = animationsData[id || 'western-wasteland'];

    // 根据不同动效配置不同的 Rive 参数
    const riveConfig: any = {
        src: animation.src,
        layout: new Layout({
            fit: Fit.Contain,
            alignment: Alignment.Center,
        }),
        autoplay: true,
        stateMachines: 'State Machine 1', // 启用交互状态机
    };

    // 花火动效只播放 Artboard2
    if (id === 'firework') {
        riveConfig.artboard = 'Artboard2';
    }

    const { RiveComponent, rive } = useRive(riveConfig);

    // 西部废土：监听 RESTART 状态触发转场音效（顺序播放）
    useEffect(() => {
        if (id === 'western-wasteland' && rive) {
            const handleStateChange = (event: any) => {
                // 检测是否触发了 RESTART 相关状态
                if (event.data && Array.isArray(event.data)) {
                    event.data.forEach((stateName: string) => {
                        if (stateName.toLowerCase().includes('restart') ||
                            stateName.toLowerCase().includes('start')) {
                            // 先播放 SwipeIn，然后延迟播放 SwipeOut
                            playSwipeIn();
                            setTimeout(() => {
                                playSwipeOut();
                            }, 800); // 与页面转场相同的延迟
                        }
                    });
                }
            };

            // 尝试监听 Rive 状态变化
            try {
                rive.on('statechange' as any, handleStateChange);
            } catch (e) {
                // 如果不支持事件监听，使用轮询检测
                console.log('Rive event listener not supported, using alternative method');
            }

            return () => {
                try {
                    rive.off('statechange' as any, handleStateChange);
                } catch (e) {
                    // Ignore cleanup error
                }
            };
        }
    }, [id, rive, playSwipeIn, playSwipeOut]);

    const togglePlayback = () => {
        if (rive) {
            playClick(); // 播放音效
            if (isPlaying) {
                rive.pause();
            } else {
                rive.play();
            }
            setIsPlaying(!isPlaying);
        }
    };



    return (
        <div className="min-h-screen bg-transparent relative z-10 pt-24 pb-20 px-4 md:px-8 overflow-x-hidden">
            <BackgroundShapes />

            {/* Back Button - 统一样式 */}
            <div className="max-w-7xl mx-auto mb-8 relative z-20">
                <Link to="/work/rive-animations" className="interactive-target inline-block">
                    <div className="group relative px-6 py-3 border-2 border-white/20 bg-transparent text-white font-display font-black text-xs uppercase tracking-widest overflow-hidden transition-all rounded-[2rem] hover:border-neon inline-flex items-center gap-3">
                        {/* Fill Effect */}
                        <div className="absolute inset-0 bg-neon -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
                        <ArrowLeft className="w-4 h-4 relative z-10 group-hover:text-black transition-colors duration-300" />
                        <span className="relative z-10 group-hover:text-black transition-colors duration-300">{isZh ? "返回动效列表" : "Back to List"}</span>
                    </div>
                </Link>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">

                {/* 新布局：正方形左右，16:9上下 */}
                <div className={`flex gap-6 ${animation.aspectRatio === 'aspect-square'
                        ? 'flex-col lg:flex-row lg:gap-6'  // 正方形：左右布局，间距缩小
                        : 'flex-col'  // 16:9：上下布局
                    }`}>

                    {/* 左侧/上方：动效画布 */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className={animation.aspectRatio === 'aspect-square' ? 'w-full lg:flex-[2]' : 'w-full'}
                    >
                        <div className={`relative bg-black/40 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 ${animation.aspectRatio} max-h-[70vh]`}>
                            <div
                                className="w-full h-full interactive-target"
                                onClick={() => {
                                    // 西部废土点击时顺序播放转场音效
                                    if (id === 'western-wasteland') {
                                        playSwipeIn();
                                        setTimeout(() => {
                                            playSwipeOut();
                                        }, 800);
                                    }
                                }}
                            >
                                <RiveComponent className="w-full h-full" />
                            </div>
                        </div>
                    </motion.div>

                    {/* 右侧/下方：信息盒子 */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className={animation.aspectRatio === 'aspect-square' ? 'w-full lg:flex-[1] flex flex-col' : 'w-full'}
                    >
                        <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-8 lg:p-10 h-full flex flex-col justify-between">

                            {/* 标题区域 */}
                            <div>
                                <div className="flex items-center gap-3 text-neon font-mono text-xs tracking-widest uppercase mb-6">
                                    <span className="animate-pulse">●</span>
                                    <span>ANIMATION</span>
                                    <div className="flex-1 h-px bg-gradient-to-r from-neon/50 to-transparent"></div>
                                </div>

                                <h1 className="font-display font-black text-5xl lg:text-6xl text-white mb-6 leading-tight">
                                    {animation.title}
                                </h1>

                                <p className="font-sans text-gray-400 text-base leading-relaxed mb-8">
                                    {animation.description}
                                </p>

                                {/* 装饰性元素 */}
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-neon"></div>
                                        <span className="font-mono text-xs text-gray-500 uppercase tracking-wider">{isZh ? '动效设计' : 'ANIMATION DESIGN'}</span>
                                    </div>
                                    <div className="w-16 h-px bg-white/10"></div>
                                    <div className="flex gap-1">
                                        <div className="w-1 h-4 bg-neon/30"></div>
                                        <div className="w-1 h-4 bg-neon/50"></div>
                                        <div className="w-1 h-4 bg-neon"></div>
                                    </div>
                                </div>
                            </div>

                            {/* 播放控制 */}
                            <div>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={togglePlayback}
                                        className="w-16 h-16 rounded-full bg-neon hover:bg-white transition-all duration-300 flex items-center justify-center interactive-target group"
                                    >
                                        {isPlaying ? (
                                            <Pause className="w-8 h-8 text-black" />
                                        ) : (
                                            <Play className="w-8 h-8 text-black ml-1" />
                                        )}
                                    </button>
                                    <div className="flex-1">
                                        <div className="font-mono text-xs text-gray-500 uppercase tracking-wider mb-1">
                                            {isPlaying ? (isZh ? '播放中' : 'Playing') : (isZh ? '已暂停' : 'Paused')}
                                        </div>
                                        <div className="flex gap-1">
                                            {Array.from({ length: 20 }).map((_, i) => (
                                                <div
                                                    key={i}
                                                    className={`w-1 h-2 rounded-full ${isPlaying ? 'bg-neon animate-pulse' : 'bg-white/10'
                                                        }`}
                                                    style={{
                                                        animationDelay: `${i * 0.1}s`,
                                                        height: `${Math.random() * 8 + 4}px`
                                                    }}
                                                ></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </motion.div>

                </div>

            </div>
        </div>
    );
};

export default RiveAnimationDetail;
