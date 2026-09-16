import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

type Currency = 'INR' | 'USD';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  toggleCurrency: () => void;
  formatAmount: (inrAmount: number) => string;
  convertAmount: (inrAmount: number) => number;
}

const USD_RATE = 86.5; // 1 USD ≈ 86.5 INR

const CurrencyContext = createContext<CurrencyContextType>({
  currency: 'INR',
  setCurrency: () => {},
  toggleCurrency: () => {},
  formatAmount: (amount: number) => `₹${amount.toLocaleString('en-IN')}`,
  convertAmount: (amount: number) => amount,
});

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sagedo_currency');
      if (saved === 'USD' || saved === 'INR') return saved;
    }
    return 'INR';
  });

  const setCurrency = useCallback((c: Currency) => {
    setCurrencyState(c);
    if (typeof window !== 'undefined') {
      localStorage.setItem('sagedo_currency', c);
    }
  }, []);

  const toggleCurrency = useCallback(() => {
    setCurrencyState(prev => {
      const next = prev === 'INR' ? 'USD' : 'INR';
      if (typeof window !== 'undefined') {
        localStorage.setItem('sagedo_currency', next);
      }
      return next;
    });
  }, []);

  const convertAmount = useCallback((inrAmount: number): number => {
    if (currency === 'USD') {
      return Math.round(inrAmount / USD_RATE);
    }
    return inrAmount;
  }, [currency]);

  const formatAmount = useCallback((inrAmount: number): string => {
    if (currency === 'USD') {
      const usd = Math.round(inrAmount / USD_RATE);
      return `$${usd.toLocaleString('en-US')}`;
    }
    return `₹${inrAmount.toLocaleString('en-IN')}`;
  }, [currency]);

  const value = useMemo(
    () => ({ currency, setCurrency, toggleCurrency, formatAmount, convertAmount }),
    [currency, formatAmount, convertAmount, setCurrency, toggleCurrency]
  );

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
