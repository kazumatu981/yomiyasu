export type ContainerType = "important"
    | "warning"
    | "info"
    | "tip"
    | "success"
    | "question"
    | "bug"
    | "note";

interface LabeledContainerWithFaIconStyles {
    label: string;
    icon: string;
    colorClass: string;
}

const DEFAULT_STYLES_DICTIONARY: Record<ContainerType, LabeledContainerWithFaIconStyles> = {
    "important": { label: "重要", icon: "fa-circle-exclamation", colorClass: "red-container" },
    "warning": { label: "注意", icon: "fa-fire", colorClass: "yellow-container" },
    "info": { label: "情報", icon: "fa-lightbulb", colorClass: "blue-container" },
    "tip": { label: "ヒント", icon: "fa-bullseye", colorClass: "green-container" },
    "success": { label: "成功", icon: "fa-trophy", colorClass: "green-container" },
    "question": { label: "疑問", icon: "fa-circle-question", colorClass: "gray-container" },
    "bug": { label: "バグ", icon: "fa-bug", colorClass: "red-container" },
    "note": { label: "メモ", icon: "fa-pen-nib", colorClass: "gray-container" },
}

const DEFAULT_CONTAINER_TYPE: ContainerType = "info";

export function safeIcon(containerType?: ContainerType, icon?: string): string {
    return icon || DEFAULT_STYLES_DICTIONARY [containerType || DEFAULT_CONTAINER_TYPE].icon;
}

export function safeLabel(containerType?: ContainerType, label?: string): string {
    return label || DEFAULT_STYLES_DICTIONARY [containerType || DEFAULT_CONTAINER_TYPE].label;
}

export function safeColorClass(containerType?: ContainerType, colorClass?: string): string {
    return colorClass || DEFAULT_STYLES_DICTIONARY [containerType || DEFAULT_CONTAINER_TYPE].colorClass;
}
