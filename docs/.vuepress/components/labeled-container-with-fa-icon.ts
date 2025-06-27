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
    color: string;
}

const DEFAULT_STYLES_DICTIONARY: Record<ContainerType, LabeledContainerWithFaIconStyles> = {
    "important": { label: "重要", icon: "fa-circle-exclamation", color: "red" },
    "warning": { label: "注意", icon: "fa-fire", color: "yellow" },
    "info": { label: "情報", icon: "fa-lightbulb", color: "blue" },
    "tip": { label: "ヒント", icon: "fa-bullseye", color: "green" },
    "success": { label: "成功", icon: "fa-trophy", color: "green" },
    "question": { label: "疑問", icon: "fa-circle-question", color: "gray" },
    "bug": { label: "バグ", icon: "fa-bug", color: "red" },
    "note": { label: "メモ", icon: "fa-pen-nib", color: "gray" },
}

const DEFAULT_CONTAINER_TYPE: ContainerType = "info";

export function safeIcon(containerType?: ContainerType, icon?: string): string {
    return icon || DEFAULT_STYLES_DICTIONARY [containerType || DEFAULT_CONTAINER_TYPE].icon;
}

export function safeLabel(containerType?: ContainerType, label?: string): string {
    return label || DEFAULT_STYLES_DICTIONARY [containerType || DEFAULT_CONTAINER_TYPE].label;
}

export function safeColor(containerType?: ContainerType, color?: string): string {
    return color || DEFAULT_STYLES_DICTIONARY [containerType || DEFAULT_CONTAINER_TYPE].color;
}
