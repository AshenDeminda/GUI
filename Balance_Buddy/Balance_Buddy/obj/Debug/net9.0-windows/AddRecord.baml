   M S B A M L   `   `   `  ����  Balance_Buddy    Balance_Buddy.AddRecord   5      W SPresentationCore, Version=9.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=9.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=9.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=9.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35^ ZWindowsFormsIntegration, Version=9.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35H 9http://schemas.microsoft.com/winfx/2006/xaml/presentation      5      R NSystem.Xaml, Version=9.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5      Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5      @d2http://schemas.microsoft.com/expression/blend/2008     5        N� Title$  
Add Record��5       N� 
Background �#F4F6F9.��5	      � $��20q�6    � ColumnDefinitions 5
   
   �� 5      $��* �6   �� 5      $��* �6   .+�5   
   �� 
������� �� CornerRadius$ 10��6$    �� Padding$ 20q�66   $��0��6C   $��10q�6S   ._�5      �� .+�5      �� $��Add Transaction��6   $��20(�63   $
��Bold"�6A   $��0,0,0,20q�6S   ���#2B2D426e   �� 5      $��Select Type:��6   $
��Bold"�60   $��0,0,0,10q�6B   �� 5       �� Orientation$ 
Horizontal=�6   $
��Left=�66   .+�5      	� -   5        $��IncomeRadio��5   a   $��Income��6"    	� 	GroupName$ TransactionType��63   $��0,0,20,0q�6O   6t   	� 5      -   5        $��ExpenseRadio��5   P   $��Expense��6"   $ TransactionType��64   6d   5      �� 5      $��	Category:��6   $
��Bold"�6-   $��	0,20,0,10q�6?   �� 5      -   5         ��Name$ CategoryDropdown��5      $��30��65   $��0,0,0,20q�6A   ${�False��6S   5      �� 5"      $��Description:��6   $
��Bold"�60   $��0,0,0,10q�6B   �� 5#      -   5         ��Name$ DescriptionBox��5#      $��30��62   $��0,0,0,20q�6>   �� 5&      $��Amount:��6   $
��Bold"�6+   $��0,0,0,10q�6=   �� 5'      -   5        $ 	AmountBox��5'      $��30��6-   $��0,0,0,20q�69   �� 5*      -   5        $��Add Transaction��5*      ���#2563EB
�������$��40��6[   $��Center=�5+      66   5,      5-      �� 50   
   
�������$ 10��6$   $ 20q�66   $��1��6C   $��10q�6S   ._�51      �� .+�52      �� $��Financial Summary��6   $��20(�65   $
��Bold"�6C   $��0,0,0,20q�6U   ���#2B2D426g   �� 55      $ 
Horizontal=�6   $��0,0,0,10q�66   .+�56      �� $��Total Income:��6    $
��Bold"�65   $	��150��6G   �� 57      -   5        	 ��Name$	 TotalIncomeText��57       $��$0.00��69   
��� � �6F   58      �� 5;      $ 
Horizontal=�6   $��0,0,0,10q�66   .+�5<      �� $��Total Expense:��6    $
��Bold"�66   $	��150��6H   �� 5=      -   5        $	 TotalExpenseText��5=       $��$0.00��6:   
���  ��6G   5>      �� 5A      $ 
Horizontal=�6   $��0,0,0,10q�66   .+�5B      �� $��Net Balance:��6    $
��Bold"�64   $	��150��6F   �� 5C      -	   5        $	 NetBalanceText��5C       $��$0.00��68   ���#2563EB6E   5D      5E      5F      5G      5H      