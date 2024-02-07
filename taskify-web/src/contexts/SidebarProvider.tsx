import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

type SidebarContextType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const SidebarContext = createContext<SidebarContextType>({
  isOpen: false,
  setIsOpen: () => {},
});
type SidebarProviderProps = {
  children: ReactNode;
};

/** 사이드바 오픈 관련 Provider
 *  isOpen, setIsOpen을 제공함
 */
export function SidebarProvider({ children }: SidebarProviderProps) {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const memoizedValue = useMemo(
    () => ({
      isOpen,
      setIsOpen,
    }),
    [isOpen, setIsOpen],
  );

  return (
    <SidebarContext.Provider value={memoizedValue}>
      {children}
    </SidebarContext.Provider>
  );
}

/** 사이드바 컨텍스트 제공하는 커스텀 훅 */
export function useSideBar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('반드시 SideBarProvider 안에서 사용해야합니다.');
  }
  return context;
}
